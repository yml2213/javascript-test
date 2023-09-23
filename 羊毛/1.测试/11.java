package com.virjar.hermes.hermesagent.hookagent;
 
import com.koushikdutta.async.http.Multimap;
import com.virjar.hermes.hermesagent.aidl.InvokeRequest;
import com.virjar.hermes.hermesagent.aidl.InvokeResult;
import com.virjar.hermes.hermesagent.plugin.AgentCallback;
import com.virjar.hermes.hermesagent.plugin.SharedObject;
import com.virjar.hermes.hermesagent.util.CommonUtils;
 
import org.apache.commons.lang3.StringUtils;
 
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;
 
import de.robv.android.xposed.XC_MethodHook;
import de.robv.android.xposed.XposedBridge;
import de.robv.android.xposed.XposedHelpers;
import de.robv.android.xposed.callbacks.XC_LoadPackage;
 
/**
 * 支持闲鱼App 6.5.10版本
 *
 * @author HuaYunBin
 */
public class XianYuSignAgent implements AgentCallback {
 
    private Object signMethodObject;
    private Method signMethod;
    private Method wuaMethod;
 
    @Override
    public String targetPackageName() {
        return "com.taobao.idlefish";
    }
 
    @Override
    public boolean needHook(XC_LoadPackage.LoadPackageParam loadPackageParam) {
        return StringUtils.equalsIgnoreCase(loadPackageParam.processName, "com.taobao.idlefish");
    }
 
    @Override
    public InvokeResult invoke(InvokeRequest invokeRequest) {
        String paramContent = invokeRequest.getParamContent();
        Multimap nameValuePairs = CommonUtils.parseUrlEncoded(paramContent);
 
        String deviceId = nameValuePairs.getString("deviceId");
        String utdId = nameValuePairs.getString("utdId");
        String ttId = nameValuePairs.getString("ttId");
        // sid可为空
        String sid = nameValuePairs.getString("sid");
        // uid可为空
        String uid = nameValuePairs.getString("uid");
        String appKey = nameValuePairs.getString("appKey");
        String t = nameValuePairs.getString("t");
        String api = nameValuePairs.getString("api");
        String data = nameValuePairs.getString("data");
        String v = nameValuePairs.getString("v");
        if (deviceId == null || utdId == null || appKey == null || t == null || api == null | data == null || v == null) {
            return InvokeResult.failed("请求参数错误");
        }
 
        String sign = makeSign(deviceId, utdId, ttId, sid, uid, appKey, t, api, data, v);
        String wua = makeWua(t, appKey);
        if (sign == null) {
            return InvokeResult.failed("生成Sign失败");
        } else if (wua == null) {
            return InvokeResult.failed("生成Wua失败");
        }
 
        Map<String, Object> resultMap = new HashMap<>(2);
        resultMap.put("x-sign", sign);
        resultMap.put("x-mini-wua", wua);
        return InvokeResult.success(resultMap, SharedObject.context);
    }
 
    private String makeWua(String t, String appKey) {
        HashMap<String, String> hashMap = new HashMap<>(2);
        hashMap.put("pageName", "");
        hashMap.put("pageId", "");
        try {
            return (String) wuaMethod.invoke(signMethodObject, t, appKey, null, hashMap, 8);
        } catch (Exception e) {
            return null;
        }
    }
 
    private String makeSign(String deviceId, String utdId, String ttId, String sid, String uid, String appKey, String t, String api, String data, String v) {
        HashMap<String, String> hashMap = new HashMap<>(11);
        hashMap.put("deviceId", deviceId);
        hashMap.put("utdid", utdId);
        hashMap.put("ttid", ttId);
        hashMap.put("appKey", appKey);
        hashMap.put("api", api);
        hashMap.put("data", URLDecoder.decode(data));
        hashMap.put("x-features", "27");
        hashMap.put("v", v);
        hashMap.put("sid", sid);
        hashMap.put("t", t);
        hashMap.put("uid", uid);
        XposedBridge.log("生成Sign的Map值为: " + hashMap.toString());
 
        try {
            return (String) signMethod.invoke(signMethodObject, hashMap, appKey, null);
        } catch (Exception e) {
            return null;
        }
    }
 
    @Override
    public void onXposedHotLoad() {
        ClassLoader hostClassLoader = SharedObject.loadPackageParam.classLoader;
        try {
            Class clazz = hostClassLoader.loadClass("mtopsdk.security.InnerSignImpl");
            XposedHelpers.findAndHookMethod(clazz, "getMtopApiSign", HashMap.class, String.class, String.class, new XC_MethodHook() {
                @Override
                protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
                    super.beforeHookedMethod(param);
                    XposedBridge.log("某鱼x-sign参数0:" + param.args[0].toString());
                    XposedBridge.log("某鱼x-sign参数1:" + param.args[1].toString());
                }
 
                @Override
                protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                    super.afterHookedMethod(param);
                    XposedBridge.log("某鱼x-sign结果:" + param.getResult());
 
                    signMethodObject = param.thisObject;
                    signMethod = (Method) param.method;
                }
            });
            XposedHelpers.findAndHookMethod(clazz, "getSecBodyDataEx", String.class, String.class, String.class, HashMap.class, int.class, new XC_MethodHook() {
                @Override
                protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
                    super.beforeHookedMethod(param);
                    XposedBridge.log("某宝x-mini-wua参数0：" + param.args[0]);
                    XposedBridge.log("某宝x-mini-wua参数1：" + param.args[1]);
                    XposedBridge.log("某宝x-mini-wua参数2：" + param.args[2]);
                    XposedBridge.log("某宝x-mini-wua参数3：" + param.args[3]);
                    XposedBridge.log("某宝x-mini-wua参数4：" + param.args[4]);
                }
 
                @Override
                protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                    super.afterHookedMethod(param);
                    XposedBridge.log("某宝x-mini-wua结果：" + param.getResult());
 
                    wuaMethod = (Method) param.method;
                }
            });
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}