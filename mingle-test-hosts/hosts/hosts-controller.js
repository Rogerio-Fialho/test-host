var HostController = HostController || {};

var Host = require('./host-model');
var Client  = require('../clients/client-model');
var rp = require("request-promise");
const fs = require('fs');

HostController.testConnection = url => {  
    return rp.get(url, { timeout: 2000 });
}

HostController.genereateUrl = function(host) {
    let URL;

    URL = (host.protocol ? host.protocol : '');
    URL += '://';
    URL += (host.ip ? host.ip : '');
    URL += (host.port ? ':' : '');
    URL += (host.port ? host.port : '');
    URL += (host.endpoint ? '/' : '');
    URL += (host.endpoint ? host.endpoint : '');
    URL += '/';

    return URL;
}

HostController.getHosts = async function () {
    var filter = {status: true}

    var query = Host.find(filter);

    query.sort({ 'createdAt': -1 });

    query.populate('_client', '_id status name sponsor alias_prefix code');
    
    var hosts = await query.exec();

    var hostok = await HostController.testHost(hosts);

    return hostok;
            
}

HostController.testconnectionHost = host => {
    if (host._client.status) {
        let url = HostController.genereateUrl(host);
        return HostController.testConnection(url).then(
            success => {
                console.log("==========SUCCESS=======");
                return host;
            },
            error => {
                console.log("==========ERROR========");
                return false;
            }
        );
    };
}

HostController.testHost = async hosts => {
    return new Promise(async (resolve, reject) => {
        hostTested = [];
        for (let i = 0; i < hosts.length; i++) {
            let testdHost = await HostController.testconnectionHost(hosts[i]);
            if(testdHost) {
                hostTested.push(testdHost);
            }
        }
        resolve(hostTested);
    });
}

HostController.exportList = () => {
    HostController.getHosts().then(hosts => {
        let data = JSON.stringify(hosts);
        fs.writeFileSync('test.json', data);   
        console.log("FILE CREATED!!!") 
    });
}
        
module.exports = HostController;
