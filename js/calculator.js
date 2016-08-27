var num1; //保存点击运算符之前输入框中的数值  
var num2; //保存第二次输入框的数值
var operator; //保存运算符  
var isPressEqualsKey = false; //记录是否按下”=“键  


//数字键事件  
function connectionDigital(ctrl) {
    var txt = document.getElementById("txtScreen");
    // 点击数字键时，判断录入是否为字符
    if (isNaN(txt.value) && txt.value !== '.') {
        alert("输入必须是数字");
        document.getElementById('txtScreen').value = '';
        return;
    };
    // 判断是否按下 =
    if (isPressEqualsKey) {
        txt.value = "";
        //已进行过计算，则清空数值输入框重新开始  
        isPressEqualsKey = false;
    }
    //数值输入已经存在小数点,则不允许再输入小数点  
    if (txt.value.indexOf('.') > -1 && ctrl.value == '.')
        return false;
    txt.value += ctrl.value; //将控件值赋给数值输入框中  
}

//ce键事件：清空数字输入框  
function clearAll() {
    document.getElementById('txtScreen').value = "";
    num1 = "";
    operator = "";
}


// 正负切换按键
function fun_bac() {
    var bac = document.getElementById('txtScreen');
    // 点击运算符时候，判断录入是否为数字
    if (isNaN(bac.value)) {
        alert("录入必须是数字");
        document.getElementById('txtScreen').value = '';
        return;
    };
    bac.value = (-1) * bac.value;
}

// 退格
function fun_Backspace() {
    var bac = document.getElementById('txtScreen');
    bac.value = bac.value.slice(0, -1);
}


// 平方根计算
function sqrtt() {
    var txS = document.getElementById('txtScreen');
    if (txS.value < 0) {
        alert("请输入非负数");
        txS.value = '';
    };
    txS.value = Math.sqrt(txS.value);
}

// 正弦计算
function sinn() {
    var txS = document.getElementById('txtScreen');
    // 弧度转化为角度
    txS.value = parseFloat(Math.sin(txS.value * Math.PI / 180).toFixed(8));
    // 标志位，以便其他运算录入
    isPressEqualsKey = true;
}
// 余弦计算
function coss() {
    var txS = document.getElementById('txtScreen');
    // 弧度转化为角度
    txS.value = parseFloat(Math.cos(txS.value * Math.PI / 180).toFixed(8));
    // 标志位，以便其他运算录入
    isPressEqualsKey = true;
}


// 求余
function yu() {

    var opValue;

    //计算表达式中存在运算符  
    var sourseValue = parseFloat(num1);
    var num2 = document.getElementById('txtScreen');
    opValue = sourseValue % parseFloat(num2.value);
    // 清除连续求余为NaN情况
    if (isNaN(opValue)) {
        num2.value = 0;
        return;
    };
    num2.value = opValue;
    isPressEqualsKey = true;

    // 屏蔽防止双击为NAN
    // num1 = "";
    // opValue = "";
}


// 运算符 事件  
function calculation(ctrl) {
    //将运算符保存入全局变量中  
    operator = ctrl.value;
    var txt = document.getElementById('txtScreen');
    // 点击运算符时候，判断num1是否为数字键
    if (isNaN(txt.value)) {
        alert("num1必须是数字");
        document.getElementById('txtScreen').value = '';
        return;
    };
    if (txt.value == "") return false; //数值输入框中没有数字，则不能输入运算符  
    //将数值输入框中的值保存到计算表达式中  
    num1 = txt.value;
    //清空输入框， 
    txt.value = "";
}


//计算结果  
function getResult() {
    var opValue;
    
    //计算表达式中存在运算符  
    var sourseValue = parseFloat(num1);
    var num2 = document.getElementById('txtScreen');
    // 点击运算结果时，判断Num2是否为运算

    if (num1.value !== null && num2.value == null) {
        alert("请输入Num2!");
        document.getElementById('txtScreen').value = '';
        return;
    };
    if (num1.value !== null && isNaN(num2.value)) {
        alert("num2必须是数字");
        document.getElementById('txtScreen').value = '';
        return;
    };
    if (operator == '×')
        opValue = accMul(sourseValue, parseFloat(num2.value));
    else if (operator == '÷') {
        if (num2.value == 0) {
            alert("除法中 除数不能为0，请重新输入");

        };
        opValue = accDiv(sourseValue, parseFloat(num2.value));
    } else if (operator == '+')
        opValue = accAdd(sourseValue, parseFloat(num2.value));
    else if (operator == '-')
        opValue = accSubtr(sourseValue, parseFloat(num2.value));

    // accSubtr(sourseValue, parseFloat(num2.value));
    // 将运算结果输出给num2
    num2.value = opValue;
    isPressEqualsKey = true;
    // 屏蔽防止双击为NAN
    // num1 = "";
    // opValue = "";
}



//除法函数，用来得到精确的除法结果 
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。 
//调用：accDiv(arg1,arg2) 
//返回值：arg1除以arg2的精确结果 

function accDiv(arg1, arg2) {
    var t1 = 0,
        t2 = 0,
        r1, r2;
    try { t1 = arg1.toString().split(".")[1].length } catch (e) {}
    try { t2 = arg2.toString().split(".")[1].length } catch (e) {}
    with(Math) {
        r1 = Number(arg1.toString().replace(".", ""))
        r2 = Number(arg2.toString().replace(".", ""))
        return (r1 / r2) * pow(10, t2 - t1);
    }
}
//给Number类型增加一个div方法，调用起来更加方便。 
Number.prototype.div = function(arg) {
    return accDiv(this, arg);
}

//乘法函数，用来得到精确的乘法结果 
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。 
//调用：accMul(arg1,arg2) 
//返回值：arg1乘以arg2的精确结果 
function accMul(arg1, arg2) {
    var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) {}
    try { m += s2.split(".")[1].length } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
//给Number类型增加一个mul方法，调用起来更加方便。 
Number.prototype.mul = function(arg) {
    return accMul(arg, this);
}

//加法函数，用来得到精确的加法结果 
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。 
//调用：accAdd(arg1,arg2) 
//返回值：arg1加上arg2的精确结果 
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
}
//给Number类型增加一个add方法，调用起来更加方便。 
Number.prototype.add = function(arg) {
    return accAdd(arg, this);
}

//减法函数，用来得到精确的减法结果 
//说明：javascript的减法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。 
//调用：accSubtr(arg1,arg2) 
//返回值：arg1减去arg2的精确结果 
function accSubtr(arg1, arg2) {
    var r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
//给Number类型增加一个subtr 方法，调用起来更加方便。 
Number.prototype.subtr = function(arg) {
    return accSubtr(arg, this);
}
