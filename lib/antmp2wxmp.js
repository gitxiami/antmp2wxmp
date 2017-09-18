var fs = require('fs');
var shelljs = require('shelljs');

String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
　 	if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
		return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);
	} else {
		return this.replace(reallyDo, replaceWith);
	}
}

function to (from, to) {
    file = fs.readFileSync(from, 'utf8');
    if (/\.axml$/i.test(from)) {
        // console.log(from)
        //file = wxml2axml.compiler(file);
		file = file.replaceAll(' a:', ' wx:')
			.replaceAll('onTouchstart', 'bindtouchstart')
			.replaceAll('onTouchmove', 'bindtouchmove')
			.replaceAll('onTouchcancel', 'bindtouchcancel')
			.replaceAll('onTouchend', 'bindtouchend')
			.replaceAll('onTap', 'bindtap')
			.replaceAll('onLongtap', 'bindlongtap')
			.replaceAll('onInput', 'bindinput')
			.replaceAll('onBlur', 'bindblur')
			.replaceAll('onChange', 'bindchange')
			.replaceAll('onSubmit', 'bindsubmit')
			.replaceAll('onFocus', 'bindfocus')
			.replaceAll('onScrolltoupper', 'bindscrolltoupper')
			.replaceAll('onScrolltolower', 'bindscrolltolower')
			.replaceAll('onScroll', 'bindscroll')
			;
        fs.writeFile(to, file, function (err) {
            if (err) throw err;
        });
    } else if (/\.js$/i.test(from)) {
        file = 'const my = wx;\n' + file;
        fs.writeFile(to, file, function (err) {
            if (err) throw err;
        });
    } else if (/\.acss$/i.test(from)) {
        file = file.replaceAll('.acss"', '.wxss"').replaceAll('.acss\'', '.wxss\'').replace(' + ', ' ').replace(' \* ', ' ');
        fs.writeFile(to, file, function (err) {
            if (err) throw err;
        });
	} else if (/app\.json$/i.test(from)) {
        file = file.replaceAll('"items"', '"list"')
			.replaceAll('"textColor"', '"color"')
			.replaceAll('"icon"', '"iconPath"')
			.replaceAll('"activeIcon"', '"selectedIconPath"')
			.replaceAll('"name"', '"text"')
			.replaceAll('"defaultTitle"', '"navigationBarTitleText"')
			.replaceAll('"pullRefresh"', '"enablePullDownRefresh"')
			.replaceAll('""', '""')
			.replaceAll('""', '""')
			.replaceAll('""', '""')
			.replaceAll('""', '""')
			.replaceAll('""', '""')
			.replaceAll('""', '""')
			;
        fs.writeFile(to, file, function (err) {
            if (err) throw err;
        });
    } else {
        shelljs.cp(from, to);
    }
}
module.exports = {
    to: to 
}