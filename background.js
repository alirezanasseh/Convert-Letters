function convert(mapObj, input)
{
    input = input.toString().replace(/./gi, function(matched){
        var ret = mapObj[matched];
        return typeof ret !== 'undefined' ? ret : matched;
    });
    return input;
}

function convertEn2Fa(input)
{
    const mapObjEn2Fa = {"z":"ظ", "x":"ط", "c":"ز", "v":"ر", "b":"ذ", "n":"د", "m":"پ", ",":"و", "a":"ش", "s":"س", "d":"ی", "f":"ب", "g":"ل", "h":"ا", "j":"ت", "k":"ن", "l":"م", ";":"ک", "\'":"گ", "q":"ض", "w":"ص", "e":"ث", "r":"ق", "t":"ف", "y":"غ", "u":"ع", "i":"ه", "o":"خ", "p":"ح", "[":"ج", "]":"چ", "\\":"پ", "H":"آ", "Z":"ك", "X":"ط", "C":"ژ", "M":"ء", "D":"ي" };
    return convert(mapObjEn2Fa, input);
}

function convertFa2En(input)
{ 
    const mapObjFa2En = {"ظ":"z", "ط":"x", "ز":"c", "ر":"v", "ذ":"b", "د":"n", "پ":"m", "و":", ","ش":"a", "س":"s", "ی":"d", "ب":"f", "ل":"g", "ا":"h", "ت":"j", "ن":"k", "م":"l", "ک":";", "گ":"\'", "ض":"q", "ص":"w", "ث":"e", "ق":"r", "ف":"t", "غ":"y", "ع":"u", "ه":"i", "خ":"o", "ح":"p", "ج":"[", "چ":"]", "پ":"\\", "آ":"H", "ك":"Z", "ژ":"C", "ء":"M", "ي":"D"};
    return convert(mapObjFa2En, input);  
}

function onClickHandler(info, tab){
    var out = "";

    if (info.menuItemId === "selection2Fa")
        out = convertEn2Fa(info.selectionText);
    else if (info.menuItemId === "selection2En")
        out = convertFa2En(info.selectionText);

    chrome.tabs.executeScript(tab.id, {
        code: 'var convertedText = "' + out + '";'
    }, function() {
        chrome.tabs.executeScript(tab.id, {file: 'content.js'});
    });

}

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(function() {
    // Create one test item for each context type. 
    chrome.contextMenus.create({"title": "تبدیل به فارسی", "contexts":["selection"], "id": "selection2Fa"});
    chrome.contextMenus.create({"title": "تبدیل به انگلیسی", "contexts":["selection"], "id": "selection2En"});
});