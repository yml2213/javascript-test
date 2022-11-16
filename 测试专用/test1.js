const TelegramBot = require('node-telegram-bot-api');
const NTBA_FIX_319 = 'test';
//-------------------------------------------------------------------
// tg 配置
const tg_token = '5744956160:AAE2KjAs15b6sh4YimDPYPnsknz3Zcjtp3g';
const admin_id = '723756771';
const botName = 'yml_car_bot';


// 数据库配置
const db_url = 'mongodb://root:yml2213@ymlnas.cn:6383';

// 青龙配置
const ql_hostname = 'http://ymlnas.cn:5508';
const client_id = 'GsE_CPvo3Xgi';
const client_secret = '6812T-A4-pBSKGv8UjhA_gV1';




//-------------------------------------------------------------------



// Export as an asynchronous function
// We'll wait until we've responded to the user
module.exports = async (request, response) => {
    try {
        // Create our new bot handler with the token
        // that the Botfather gave us
        // Use an environment variable so we don't expose it in our code
        const bot = new TelegramBot(tg_token);

        // Retrieve the POST request body that gets sent from Telegram
        const {
            body
        } = request;

        // Ensure that this is a message being sent
        await task(body, bot);

    } catch (error) {
        // If there was an error sending our message then we 
        // can log it into the Vercel console
        console.error('Error sending message');
        console.log(error.toString());
    }

    response.send('OK, runing...');
};




class MongoDb {
    constructor(dbUrl, dbName, collectionName) {
        this.dbUrl = dbUrl;
        this.dbName = dbName;
        this.collectionName = collectionName;
        this.MongoClient = require("mongodb").MongoClient;
        this.client = new this.MongoClient(dbUrl);
    }


    async doSql(action) {

        try {
            await this.client.connect();
            // console.log('成功连接到服务器');
            let db = this.client.db(this.dbName);
            let collection = db.collection(this.collectionName);

            return await action(collection);
        } catch (error) {
            console.log(error);
            return Promise.reject();
        } finally {
            this.client.close();
        }
    }

    // 直接插入 json 数据
    async writeData(data) {
        return this.doSql(async (collection) => {

            let insertResult = await collection.insertOne(data);
            // console.log('插入结果 =>', insertResult);

            if (insertResult.acknowledged) {
                console.log(`写入 ${JSON.stringify(data)} , 成功!`);
                return true;
            } else {
                console.log(`写入${data}, 失败!`);
                // return true;
            }
            return 'done.';
        });

    }
    async queryData(data) {
        let v1 = data;
        typeof (v1) == 'string' ? v1 = parseInt(v1) : v1;
        let b = {
            tgId: v1
        };
        return this.doSql(async (collection) => {
            // 查询过滤器以仅查找满足查询条件的文档
            let filteredDocs = await collection.find(b).toArray();
            // console.log('查找结果 =>', filteredDocs);
            // console.log(filteredDocs.length);
            if (filteredDocs.length == 1) {
                let {
                    name,
                    tgId
                } = filteredDocs[0];
                console.log(`共查询到${filteredDocs.length}条, 用户名: ${name}, tgId: ${tgId}`);
                return true;
            } else if (filteredDocs.length > 1) {
                console.log(`共查询到${filteredDocs.length}条数据\n${JSON.stringify(filteredDocs)}`);
                return true;

            } else if (filteredDocs.length == 0) {
                console.log(`未查询到数据, 无权限`);
                return false;

            }
            return 'done.';
        });

    }

    // queryYmlList
    async queryYmlList() {
        return this.doSql(async (collection) => {
            return await collection.find({}).toArray();
        });

    }

    async deletedData(data) {
        let v1 = data;
        typeof (v1) == 'string' ? v1 = parseInt(v1) : v1;
        let b = {
            tgId: v1
        };

        return this.doSql(async (collection) => {
            let filteredDocs = await collection.find(b).toArray();
            // console.log('查找结果 =>', filteredDocs);
            if (filteredDocs.length == 1) {
                let {
                    tgId
                } = filteredDocs[0];
                await delete_data(tgId);
            } else if (filteredDocs.length > 1) {
                for (let user of filteredDocs) {
                    await delete_data(user.tgId);
                }
            } else if (filteredDocs.length == 0) {
                console.log(`未查询到数据, 跳过删除!`);
            }

            async function delete_data(Id) {
                let a = await collection.deleteMany({
                    tgId: Id
                });
                if (a.deletedCount > 0) {
                    console.log(`成功删除 ${a.deletedCount} 条数据`);
                }
            }
            return 'done.';
        });

    }
}

class Qinglong {
    constructor(ql_hostname, client_id, client_secret) {
        this.ql_hostname = ql_hostname;
        this.ql_api = this.ql_hostname + '/open';
        this.client_id = client_id;
        this.client_secret = client_secret;
    }

    // get_token 登录
    async login() {
        try {
            var options = {
                'method': 'get',
                'url': `${this.ql_api}/auth/token?client_id=${this.client_id}&client_secret=${this.client_secret}`,
                'headers': {}
            };
            // console.log(options);
            let res = await this.http_req(options);
            // console.log(res);
            if (res.code == 200) {
                this.token = res.data.token;
            } else if (res.code == 400) {
                console.log(res.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    getEnvOptions(method, body) {
        let options = {
            'method': method,
            'url': `${this.ql_api}/envs`,
            'headers': {
                authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        };

        if (body) {
            options.body = JSON.stringify(body);
        }
        return options;
    }

    async doEnvApi(obj) {
        let {
            method,
            data,
            success,
            error,
        } = obj;

        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.http_req(this.getEnvOptions(method, data));
                // console.log(res);
                if (res.code == 200) {
                    console.log(res.data);
                    console.log(res.data.length);
                    success(res.data);
                    resolve(res.data);
                } else if (res.code == 400) {
                    console.log(res.message);
                    error(res);
                    reject(res.message);

                }
            } catch (error) {
                console.log(`未知错误\n${error}`);
                reject(`未知错误\n${error}`);
            }
        });

    }

    async getEnv() {
        return this.doEnvApi({
            method: 'get'
        });
    }

    async addEnv(data) {
        return new Promise(async (resolve) => {
            await this.doEnvApi({
                method: 'post',
                data: data,
                success: (res) => {
                    resolve(res);
                    console.log(`添加成功`);
                },
                error: () => {
                    console.log(res.message, 'ck重复');
                    resolve("ck重复, 请确认后再上传!");
                }

            });
        });

    }


    async deleteEnv(data) {
        return this.doEnvApi({
            method: 'delete',
            data: data,
            success: () => {
                console.log(`删除成功`);
            }
        });
    }


    async putEnv(data) {
        return this.doEnvApi({
            method: 'put',
            data: data,
            success: () => {
                console.log(`更新成功`);
            }
        });
    }


    async http_req(options) {
        const request = require('request');

        return new Promise((resolve, reject) => {

            function isJsonString(str) {
                if (typeof str == "string") {
                    try {
                        if (typeof JSON.parse(str) == "object") {
                            return true;
                        }
                    } catch (e) {
                        return false;
                    }
                }
                return false;
            }

            request(options, function (error, response) {
                if (error) throw new Error(error);
                // response.body
                let data = response.body;
                try {
                    if (typeof data == "string") {
                        if (isJsonString(data)) {
                            resolve(JSON.parse(data));
                        } else {
                            resolve(data);
                        }
                    } else {
                        resolve(data);
                    }
                } catch (e) {
                    console.log(error, response);
                    reject(error);
                }
            });
        });
    }
}


class DoTask {
    constructor(body) {
        this.body = body;
        this.bot = new TelegramBot(tg_token);
        this.resMsg = body.message;
        this.fromId = body.message.from.id;
        this.chatId = body.message.chat.id;
        this.type = body.message.chat.type;
    }

    async getName() {
        let a = this.resMsg.from;
        let name = a.first_name;
        if (a.last_name) {
            name += " " + a.last_name;
        }
        return name;
    }

    async getName2(a) {
        let name = a.first_name;
        if (a.last_name) {
            name += " " + a.last_name;
        }
        return name;
    }


    async ping() {
        console.log(await this.getName());
        let msg = '/pong';
        console.log(this.chatId, msg);
        await this.bot.sendMessage(this.chatId, msg);
    }

    async help() {
        let msg = `目前仅支持投稿上车模式，后续可能会更改上车模式!\n创建机器人的初衷是群友反馈: 我辛辛苦苦找的毛，投稿了公开几千人玩，毛就死了，没啥动力找毛了\n投稿请使用/uptoulu 或直接私聊我(@yml2213), 非常感谢大家的支持， 后续有稳定的毛还是会发频道(https://t.me/yml2213_tg), 大家一起玩的!`;

        // const mongo = new MongoDb(db_url, 'tgBot', 'postTelegram');
        // let data_help = { tgName: `${tg_Name}`, tgId: `${this.fromId}`, msg: `${msg_help}` };
        // await mongo.writeData(data_help);

        await this.bot.sendMessage(this.chatId, msg);
    }

    async list() {
        console.log(`------ allow_check  ${await this.allow_check(this.fromId)}------------`);
        let tg_Name = await this.getName();
        if (await this.allow_check(this.fromId)) {
            if (this.type.indexOf('group') > -1) { // 在群组中
                let message = `${tg_Name}\n请私聊机器人\n请私聊机器人\n请私聊机器人`;
                await this.bot.sendMessage(this.chatId, message);
            } else if (this.type == 'private') {

                let data_list = await this.get_data_list();
                console.log(`------ 任务列表:  \n${data_list}--------`);

                // const mongo = new MongoDb(db_url, 'tgBot', 'postTelegram');
                // let write_data = { tgName: `${tg_Name}`, tgId: `${this.fromId}`, msg: `${data_list}` };
                // await mongo.writeData(write_data);

                await this.bot.sendMessage(this.fromId, data_list);
            }
        } else {
            console.log(`拒绝`);
            let message = `${this.fromId}: 您需要投稿并且写完发布后， 才可以获取偷撸列表!`;
            await this.bot.sendMessage(this.chatId, message);
        }
    }


    async uptoulu() {
        let tg_Name = await this.getName();
        if (this.type.indexOf('group') > -1) { // 在群组中
            let message = `${tg_Name}\n请私聊机器人!\n请私聊机器人!!\n请私聊机器人!!!`;
            await this.bot.sendMessage(this.chatId, message);
        } else if (this.type == 'private') {
            let msg = '请按照以下格式上传(或直接私聊我 @yml2213):\n/uptoulu  毛名字 app/小程序  实物/现金  任务类型 上传者   备注\n\n例: /uptoulu 诗画浦江 app 实物  签到，日常任务  yml  毛大得很';

            await this.bot.sendMessage(this.fromId, msg);

        }
    }


    async upck() {
        let tg_Name = await this.getName();
        if (await this.allow_check(this.fromId)) {
            if (this.type.indexOf('group') > -1) { // 在群组中
                let message = `${tg_Name}\n请私聊机器人!\n请私聊机器人!!\n请私聊机器人!!!`;
                await this.bot.sendMessage(this.chatId, message);
            } else if (this.type == 'private') {
                let msg = `请按照以下格式上传：\n/upck 毛英文名字例(jlqc)=你的ck\n请一次上传一条ck!\n例如: /upck jlqc=xxxxxxxx`;
                await this.bot.sendMessage(this.fromId, msg);
            }
        } else {
            console.log(`拒绝`);
            let message = `${this.fromId}: 您需要投稿并且写完发布后， 才可以获取偷撸列表!`;
            await this.bot.sendMessage(this.chatId, message);
        }
    }


    async addallow() {
        let tg_Name = await this.getName();
        if (this.fromId == admin_id) {
            let a = this.resMsg.reply_to_message;
            console.log(a);
            let _name = await this.getName2(a.from);
            let _id = a.from.id;

            let data = {
                name: _name,
                tgId: _id
            };
            console.log(data);
            const mongo = new MongoDb(db_url, 'tgIds', 'tg-ids');
            await mongo.writeData(data);

            let message_admin = `${_name}: 加入偷撸成功!`;
            await this.bot.sendMessage(this.chatId, message_admin);
        } else {
            let data = `对不起 ${tg_Name}, 您没有权限!`;
            await this.bot.sendMessage(this.chatId, data);
        }
    }

    async addlist() {
        let tg_Name = await this.getName();
        if (this.fromId == admin_id) {

            let data = `请按照以下格式提交    \n吉利汽车&jlqc&签到,任务等&抓 app.geely.com 的token值即可`;
            await this.bot.sendMessage(this.chatId, data);

        } else {
            let data = `对不起 ${tg_Name}, 您没有权限!`;
            await this.bot.sendMessage(this.chatId, data);
        }
    }

    async addlist_p() {
        let tg_Name = await this.getName();
        if (this.fromId == admin_id) {

            let data = `请按照以下格式提交    \n吉利汽车&jlqc&签到,任务等&抓 app.geely.com 的token值即可`;
            await this.bot.sendMessage(this.chatId, data);

        } else {
            let data = `对不起 ${tg_Name}, 您没有权限!`;
            await this.bot.sendMessage(this.chatId, data);
        }
    }



    async uptoulu_p(resp) {
        let tg_Name = await this.getName();
        if (this.type.indexOf('group') > -1) { // 在群组中
            let message = `${tg_Name}\n请私聊机器人!\n请私聊机器人!!\n请私聊机器人!!!`;
            await this.bot.sendMessage(this.chatId, message);
        } else if (this.type == 'private') {
            try {
                let message = `投稿者: ${tg_Name}(${this.fromId})收到并感谢投稿, 等写成毛并发布后, 即可获得list权限, 免费上车!`;
                let message_admin = `投稿者: ${tg_Name}(${this.fromId})\n${resp}`;
                await this.bot.sendMessage(this.fromId, message); // 通知投稿者
                await this.bot.sendMessage(admin_id, message_admin); // 通知我

                const mongo = new MongoDb(db_url, 'tlList', 'tgList');
                let write_data = {
                    tgName: `${tg_Name}`,
                    tgId: `${this.fromId}`,
                    content: `${resp}`,
                    msg: `${message_admin}`
                };
                await mongo.writeData(write_data);
            } catch (error) {
                console.log(error);
                let message = `请按照要求投稿!\n请按照要求投稿!!\n请按照要求投稿!!!`;
                await this.bot.sendMessage(this.fromId, message);
            }
        }
    }

    async upck_p(resp) {
        let tg_Name = await this.getName();
        if (await this.allow_check(this.fromId)) {
            if (this.type.indexOf('group') > -1) { // 在群组中
                let message = `${tg_Name}\n请私聊机器人!\n请私聊机器人!!\n请私聊机器人!!!`;
                await this.bot.sendMessage(this.chatId, message);
            } else if (this.type == 'private') {
                try {
                    let ckName = resp.split("=")[0];
                    let ck = resp.split("=")[1];
                    // /upck jlqc=xxxxxxxx
                    let message = `ck上传: \n${resp}\n===>上传中... 请稍等\n\n\n请勿代挂, 且撸且珍惜, 感谢您的支持!`;
                    await this.bot.sendMessage(this.fromId, message); // 通知上传者

                    if (!await this.is_zh(resp)) { // 判断上传数据是否合法
                        // console.log(`无中文`);
                        if (ckName != '' && ck != '') {
                            // console.log(`全部有数据`);
                            let ql_data = [{
                                "value": ck + '##' + this.fromId,
                                "name": ckName,
                                "remarks": `${tg_Name}(${this.fromId})`
                            }];
                            const ql = new Qinglong(ql_hostname, client_id, client_secret);
                            await ql.login();
                            let data_ql = await ql.addEnv(ql_data);
                            console.log(data_ql);
                            if (data_ql.length == 1) {
                                let {
                                    name,
                                    remarks
                                } = data_ql[0];
                                let a = `恭喜 ${remarks}, 上传${name}===>成功!\n\n\n请勿代挂, 且撸且珍惜, 感谢您的支持!`;
                                await this.bot.sendMessage(this.fromId, a); // 通知上传者
                                let b = `ck上传者: ${tg_Name}(${this.fromId}), 上传${name}===>成功!`;
                                await this.bot.sendMessage(admin_id, b); // 通知我

                                const mongo = new MongoDb(db_url, 'tlList', 'ckList');
                                let message_admin = `ck上传者: ${tg_Name}(${this.fromId})\n${resp}`;
                                let write_data = {
                                    tgName: `${tg_Name}`,
                                    tgId: `${this.fromId}`,
                                    msg: `${message_admin}`,
                                    ckName: `${ckName}`,
                                    ck: `${ck}`,
                                    ckFlag: true
                                };
                                await mongo.writeData(write_data);
                            } else {
                                let a = `上传${ckName}===>失败\n原因可能是:${data_ql}\n请自行更正后在上传!`;
                                await this.bot.sendMessage(this.fromId, a); // 通知上传者
                            }
                        } else {
                            // console.log(`数据 不全`);
                            let data = `上传ck: 失败(数据 不全)\n请按照以下格式提交\n/upck jlqc=xxxxxxxx`;
                            await this.bot.sendMessage(this.fromId, data);
                        }
                    } else {
                        let a = `上传ck: 失败\n原因可能是: 提交数据 含有中文\n请不要添加中文`;
                        await this.bot.sendMessage(this.fromId, a); // 通知上传者
                    }

                } catch (error) {
                    let a = `上传ck: 失败\n 未知错误, 检查点--2`;
                    await this.bot.sendMessage(admin_id, a); // 通知上传者
                }
            }
        } else {
            console.log(`upck 拒绝`);
            let message = `${this.fromId} 您需要投稿并且写完发布后， 才可以获取偷撸列表!`;
            await this.bot.sendMessage(this.chatId, message);
        }
    }

    async addlist_p(resp) {
        let tg_Name = await this.getName();
        if (this.fromId == admin_id) {
            try {
                let t = resp.split("&");
                // console.log(t);
                let [a, b, c, d] = [t[0], t[1], t[2], t[3]];
                // console.log(a, b, c, d);
                if (!await this.is_zh(b)) {
                    // console.log(`无中文`);
                    if (a != '' && b != '' && c != '' && d != '') {
                        // console.log(`全部有数据`);
                        let data = {
                            name: a,
                            ckName: b,
                            des: c,
                            ckDes: d
                        };
                        // console.log(data);
                        const mongo = new MongoDb(db_url, 'tlList', 'ymlList');
                        await mongo.writeData(data);
                        let message = `偷撸列表: 添加 ${a} 成功!`;
                        await this.bot.sendMessage(this.chatId, message);

                    } else {
                        // console.log(`数据 不全`);
                        let data = `增加偷撸列表: 失败(数据 不全)\n请按照以下格式提交\n\n/addlist 吉利汽车&jlqc&签到,任务等&抓 app.geely.com 的token值即可 `;
                        await this.bot.sendMessage(this.chatId, data);
                    }
                } else {
                    // console.log(`有中文`);
                    let data = `增加偷撸列表: 失败(有中文)\n请按照以下格式提交\n\n/addlist 吉利汽车&jlqc&签到,任务等&抓 app.geely.com 的token值即可 `;
                    await this.bot.sendMessage(this.chatId, data);
                }
            } catch (error) {
                // console.log(error);
                let data = `增加偷撸列表: ${error}\n请检查后重试!\n请按照以下格式提交\n/addlist 吉利汽车&jlqc&签到,任务等&抓 app.geely.com 的token值即可 `;
                await this.bot.sendMessage(this.chatId, data);
            }
        } else {
            let data = `对不起 ${tg_Name}, 您没有权限!`;
            await this.bot.sendMessage(this.chatId, data);
        }
    }

    async unm(text) {
        let tg_Name = await this.getName();
        try {
            typeof (text) == 'string' ? text = parseInt(text) : text;
            if (text > 0 && text < 1000) {
                const mongo = new MongoDb(db_url, 'tgIds', 'tg-ids');
                if (await mongo.queryData(this.fromId)) {

                    if (this.type.indexOf('group') > -1) { // 在群组中
                        let message = `${tg_Name}\n请私聊机器人!\n请私聊机器人!!\n请私聊机器人!!!`;
                        await this.bot.sendMessage(this.chatId, message);
                    } else if (this.type == 'private') {
                        const mongo = new MongoDb(db_url, 'tlList', 'ymlList');
                        let lists = await mongo.queryYmlList();

                        if (text <= lists.length) {
                            let data = `${text}: ${lists[text - 1].name}\n${lists[text - 1].ckDes}\n\n\n请勿呆瓜, 且行且珍惜!----yml告`;
                            await this.bot.sendMessage(this.fromId, data);
                        } else {
                            let data = `哪里有那么多毛让你薅, 心里没点数吗? (坏笑.jpg)`;
                            await this.bot.sendMessage(this.fromId, data);
                        }
                    }

                } else {
                    let data = `对不起 ${tg_Name}, 您没有权限!`;
                    await this.bot.sendMessage(this.chatId, data);
                }

            } else { // NaN
                let message = `抱歉: ${tg_Name}, 我没听懂您说的啥\n检查点--3`;
                await this.bot.sendMessage(this.fromId, message);
                await this.bot.sendMessage(admin_id, message);
            }
        } catch (error) {
            console.log(`数字处理: ${error}`);
            let message = `错误: ${error}, 我没听懂您说的啥\n检查点--4`;
            await this.bot.sendMessage(admin_id, message);
        }


    }

    // ============================================================
    async is_zh(str) {
        var a = new RegExp("[\u4E00-\u9FA5]+");
        let b = a.test(str);
        return b;
    }

    async allow_check(id) {
        const mongo = new MongoDb(db_url, 'tgIds', 'tg-ids');
        let a = await mongo.queryData(id);
        return a;
    }

    async get_data_list() {
        let data_list = '';
        const mongo = new MongoDb(db_url, 'tlList', 'ymlList');
        let lists = await mongo.queryYmlList();
        for (let index = 0; index < lists.length; index++) {
            let {
                name,
                des
            } = lists[index];
            // console.log(name, des);
            data_list += ` ${index + 1}:  ${name}   ${des}\n`;
        }
        return data_list;
    }
}




async function task(body) { // 接受消息初步处理

    let dotask = new DoTask(body);
    // const mongo = new MongoDb(db_url, 'tgBot', 'telegram-response');  // tg发过来的数据, telegram-response集合
    // await mongo.writeData(body.message);

    let resMsg = body.message;

    let text = resMsg.text;

    if (text.indexOf(' ') > -1 && text.indexOf('/') > -1) {
        console.log(`多参数 带空格 命令`);
        await parameter(text, resMsg);
    } else if (text.indexOf('/') > -1) {
        console.log(`单命令 无空格`);
        await order(text);

    } else {
        console.log(`正常消息`);
        await normal(text);
    }


    async function order(text) {
        switch (text) {
            case '/ping':
            case `/ping@${botName}`:
                await dotask.ping();
                break;

            case '/help':
            case '/start':
            case `/help@${botName}`:
            case `/start@${botName}`:
                await dotask.help();
                break;


            case '/list':
            case `/list@${botName}`:
                await dotask.list();
                break;

            case '/uptoulu':
            case `/uptoulu@${botName}`:
                await dotask.uptoulu();
                break;

            case '/upck':
            case `/upck@${botName}`:
                await dotask.upck();
                break;

            case '/addallow':
                await dotask.addallow();
                break;

            case '/addlist':
                await dotask.addlist();
                break;

            default:
                let tg_Name = dotask.getName();
                let message = `抱歉: ${tg_Name}, 我没听懂您说的啥\n
				错误检查点--1`;
                await this.bot.sendMessage(this.chatId, message);
                break;
        }


    }


    async function parameter(text, resMsg) {

        let fromId = resMsg.from.id;
        let chatId = resMsg.chat.id;
        let type = resMsg.chat.id;

        function get_resp(order_name) {
            var re = new RegExp(`${order_name} (.+)`);
            let matches = re.exec(text);
            try {
                let resp = matches[1];
                return resp;
            } catch (error) {
                console.log(`匹配${order_name}的参数错误`);
                return false;
            }
        }

        if (text.indexOf("/uptoulu") > -1) {
            let resp = get_resp("/uptoulu");
            if (resp) {
                await dotask.uptoulu_p(resp);
            } else {
                let message = `/uptoulu  参数错误`;
                await this.bot.sendMessage(chatId, message);
            }
        } else if (text.indexOf("/upck") > -1) {
            let resp = get_resp("/upck");
            if (resp) {
                await dotask.upck_p(resp);
            } else {
                let message = `/upck  参数错误`;
                await this.bot.sendMessage(chatId, message);
            }
        } else if (text.indexOf("/addlist") > -1) {
            let resp = get_resp("/addlist");
            if (resp) {
                await dotask.addlist_p(resp);
            } else {
                let message = `/addlist  参数错误`;
                await this.bot.sendMessage(chatId, message);
            }
        }


    }

    async function normal(text) {
        if (text) {
            await dotask.unm(text);


        } else {
            console.log(text, '只是普通聊天,放过他吧!');

        }
    }




}