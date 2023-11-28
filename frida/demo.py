import time
import frida
device = frida.get_remote_device()
pid = device.spawn(["com.idejian.sm"])#程序名
device.resume(pid)
time.sleep(1) 
session = device.attach(pid)
with open("hook.js") as f:
    script = session.create_script(f.read())
script.load()
input()