const LowENLetters = [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '\\', ',', '[', ']', ';', '\''];
const UpENLetters = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const FALetters = [' ', 'ش', 'ذ', 'ز', 'ی', 'ث', 'ب', 'ل', 'ا', 'ه', 'ت', 'ن', 'م', 'ئ', 'د', 'خ', 'ح', 'ض', 'ق', 'س', 'ف', 'ع', 'ر', 'ص', 'ط', 'غ', 'ظ', 'پ', 'و', 'ج', 'چ', 'ک', 'گ'];

function convert(str) {
    let letter = '', index = -1, resultArray = [];
    for(let i = 0; i < str.length; i++){
        letter = str[i];
        index = LowENLetters.indexOf(letter);
        if(index > -1){
            resultArray[i] = FALetters[index];
        }else{
            index = UpENLetters.indexOf(letter);
            if(index > -1){
                resultArray[i] = FALetters[index];
            }else{
                index = FALetters.indexOf(letter);
                if(index > -1){
                    resultArray[i] = LowENLetters[index];
                }
            }
        }
    }
    return resultArray.join('');
}

function onClickHandler(info, tab){
    prompt('متن تبدیل شده', convert(info.selectionText));
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(function() {
    // Create one test item for each context type.
    var context = "selection";
    var title = "تبدیل حروف";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context], "id": "context" + context});
});