const os = require('os');
function getIPAdress(){  
  var interfaces = require('os').networkInterfaces();  
  for(var devName in interfaces){  
        var iface = interfaces[devName];  
        for(var i=0;i<iface.length;i++){  
             var alias = iface[i];  
             if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                   return alias.address;  
             }  
        }  
  }  
}
// 获取系统信息
exports.index = async (ctx) => {
  ctx.success({
    arch: os.arch(),
    cpus: os.cpus(),
    freemem: os.freemem() / 1024 / 1024,
    totalmem: os.totalmem() / 1024 / 1024,
    hostname: os.hostname(),
    address: getIPAdress(),
    platform: os.platform(),
    release: os.release()
  });
};