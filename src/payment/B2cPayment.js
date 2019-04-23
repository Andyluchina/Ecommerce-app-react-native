
const fkg = {};

const PAGE_SIZE=5;
fkg.PAGE_SIZE=PAGE_SIZE

const CODE_COMM_0_SUCCESS=0;
fkg.CODE_COMM_0_SUCCESS = CODE_COMM_0_SUCCESS;

const CODE_COMM_INPUT_ERROR=70;
fkg.CODE_COMM_INPUT_ERROR = CODE_COMM_INPUT_ERROR;

const MODE_NEW=1;
fkg.MODE_NEW=MODE_NEW;

const MODE_EDIT=3;
fkg.MODE_EDIT=MODE_EDIT;

const MODE_VIEW=5;
fkg.MODE_VIEW=MODE_VIEW;

const PIC_URL = "http://xhyhaiyan.oss-cn-beijing.aliyuncs.com/";
fkg.PIC_URL = PIC_URL;

const getUrl = ( uri ) => {
	 let websit = "http://106.14.1.151:8009"; 
	 //    websit = "http://127.0.0.1:8009";
	 
    return websit + uri;
}
fkg.getUrl = getUrl;

const getDomElement = ( selector ) => {
    let element = document.querySelector( selector );
    return element;
}
fkg.getDomElement = getDomElement;

const getDomValue = ( selector ) => {
    let element = document.querySelector( selector );
    let tn = element.tagName.toLowerCase();
    if ( tn == 'input' && element.type == 'file' )
        return element.files[0];
    return element.value;
}
fkg.getDomValue = getDomValue;

const setDomValue = ( selector, val ) => {
    let element = document.querySelector( selector );
    let tn = element.tagName.toLowerCase();
    if ( tn == 'input' && element.type == 'file' )
        element.files[0] = val;
    else
        element.value = val;
}
fkg.setDomValue = setDomValue;

const setAppItem = ( key,value ) => {
    //implement storage here

}
fkg.setAppItem = setAppItem;

const getAppItem = ( key ) => {
    let value = 'token';//get value from your storage

    return value;
}
fkg.getAppItem = getAppItem;

const asyncHttpPost = ( url, param, succ, err ,contentType) => {
    if(!contentType)contentType="application/json";
    
    let headers = {};
    headers['content-type'] = contentType;
    headers['auth'] = fkg.getAppItem( 'token' );

    let params = {
        method: 'post',
        credentials: 'include', // include, same-origin, *omit
        mode: 'cors', // no-cors, cors, *same-origin
        headers: headers,
        body: param
    }

    fetch( fkg.getUrl( url ), params ).then( function( response ) {
        if ( !response.ok ) {
            throw Error( response.statusText );
        }
        return response.json();
    } ).then( succ ).catch( err );
};
fkg.asyncHttpPost = asyncHttpPost;

const asyncHttpGet = ( url, succ, err ,contentType) => {
    if(!contentType)contentType="application/x-www-form-urlencoded";
    
    let params = {
        method: 'get',
        credentials: 'include', // include, same-origin, *omit
        mode: 'cors', // no-cors, cors, *same-origin
        headers: {
            'content-type': contentType,
        },
    }

    fetch( fkg.getUrl( url ), params ).then( function( response ) {
        if ( !response.ok ) {
            throw Error( response.statusText );
        }
        let json = response.json();
        return json;
    } ).then( succ ).catch( err );
};
fkg.asyncHttpGet = asyncHttpGet;

const pushintoOss= (fileName,file,succ,err)=>{
        let OSS = require('ali-oss');
        const client = new OSS({
            region: "oss-cn-beijing",
            bucket: "xhyhaiyan",
            accessKeyId: "LTAIfeJPa5mmsKhL",
            accessKeySecret: "Dfz3Tj7Tyuojl84vSBHX7E9eluivj5"
        });
        client.put(
            fileName, file
        ).then(function(result){
            return result
        }).then(succ).catch(err);
}
fkg.pushintoOss=pushintoOss

const genFileName = (name) =>{
	return name+"/"+new Date().getTime()+"_"+Math.round((Math.random()*10000));
}
fkg.genFileName=genFileName;

export default fkg;