        import { onAuthStateChanged, getAuth} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, child, get, onValue, push, update, query, orderByChild, onChildAdded, limitToFirst, limitToLast, 
startAt, startAfter, endAt, endBefore, equalTo, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {firebaseConfig} from './config.js';
//const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseApps = initializeApp(firebaseConfig);
//const auth = firebase.auth();
//const firestore = firebase.firestore();
const db = getDatabase();
secks()
document.getElementById("jaids").onchange = function() {secks()};
function secks(){

            let jaid = document.getElementById('jaids');
            var valuea = jaid.value;
            var text = jaid.options[jaid.selectedIndex].text;
			switch(valuea){
				case 'almas':{
					var uidc = "8Vxgxu8C1ZMTGdZCXyCKINVL9lg2";
					break;
				}
				case 'kota':{
					var uidc = "TKsxwHQnaleL3YZxv34wykBm4Yb2"
					break;
				}
				case 'pul':{
					var uidc = "5GX14bgXFFfougpqulk0SQBKb732";
					break;
				}
			}
			
const ssearch = document.getElementById('ssearch');
ssearch.addEventListener('click', () => {
	var ssearchmonth = document.getElementById('ssearchmonth').value;
	var ssearchyear = document.getElementById('ssearchyear').value;
		update(ref(db, uidc + "/" + "spend"),{
			assearchm: ssearchmonth,
			assearchy: ssearchyear,
	},);
function GetAllDataOnce(){
	const que = query(ref(db, uidc), orderByChild("spend"));
	
	get(que).then((snapshot)=>{
		var data = [];
		
		snapshot.forEach(childSnapshot =>{
			data.push(childSnapshot.val());
		});
		console.log(data)
	
	})
}
let spendlist = [];
let sno = 0;
let tbody = document.getElementById('tbody3');
const selectAllDataOnce = () =>{
	const dbRefs = ref(db);
	get(child(dbRefs, uidc + '/spend')).then((snapshot)=>{
		spendlist = [];
		snapshot.forEach(spend =>{
			spendlist.push(spend.val());
			
		});
		AddAllRecords();
	
	})

}


const selectAllDataRealtime = () =>{
	const dbRefs = ref(db, uidc + '/spend' + '/' + ssearchyear + '/' + ssearchmonth);
	onValue(dbRefs, (snapshot) => {
		spendlist = [];
		snapshot.forEach(spend =>{
			spendlist.push(spend.val());
			//let toint = shop.child("is").val();
			//let total = parseInt(toint);
			//console.log(total)
		});
	

		
		AddAllRecords();
				var table = document.getElementById("tbody3"), sumVal = 0;
            
            for(var i = 0; i < table.rows.length; i++)
            {
                //sumVal = sumVal + parseInt(table.rows[i].cells[3].innerHTML);
				var aa = table.rows[i].cells[2].innerHTML.toEnglishDigits();
				var aaa = parseInt(aa);
                sumVal = sumVal + aaa;
            }
            var as = sumVal.toString();
            //document.getElementById("val").innerHTML = "Sum Value = " + sumVal;
			let stotal = document.getElementById('stotal');
			stotal.innerHTML = 'به مقدار' + as.toPersianDigits().bold() + 'ماه  ' + ssearchmonth.toPersianDigits() + ' ' + 'سال ' + ssearchyear.toPersianDigits();
            //console.log(sumVal);
	
	})

}
String.prototype.toEnglishDigits = function () {
    var persian = { '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9' };
    var arabic = { '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9' };
    return this.replace(/[^0-9.]/g, function (w) {
        return persian[w] || arabic[w] || w;
    });
};
String.prototype.toPersianDigits = function () {
    //var persian = { '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9' };
    var persian = {'0': '۰', '1': '۱', '2': '۲', '3': '۳','4': '۴', '5': '۵', '6': '۶', '7': '۷', '8': '۸', '9': '۹' };
    //var arabic = { '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9' };
    return this.replace(/[^۰-۹.]/g, function (w) {
        return persian[w] || w;
    });
};
const AddSingleRecords = (info, dateday, datemonth, dateyear, money, is, ids) => {
	let trow = document.createElement('tr');
	let td1 = document.createElement('td');
	let td2 = document.createElement('td');
	let td3 = document.createElement('td');
	let td4 = document.createElement('td');
	let td5 = document.createElement('td');
	let td6 = document.createElement('td');
	let td7 = document.createElement('td');
	
	
	td1.innerHTML = ++sno;
	td2.innerHTML = info;
	td3.innerHTML = dateday.toPersianDigits() + '/' + datemonth.toPersianDigits() + '/' + dateyear.toPersianDigits();
	td4.innerHTML = money.toPersianDigits();
	//td5.innerHTML = is;
	td6.innerHTML = ids;
    
	
    let EditBtns = document.createElement('button')

EditBtns.id = 'edit-' + sno;

EditBtns.className = 'btn btn-primary me-2';
EditBtns.innerHTML = is;
EditBtns.setAttribute("data-bs-toggle", 'modal');
EditBtns.setAttribute("data-bs-target", '#actionModals');
EditBtns.addEventListener('click', LoadModals);

td5.append(EditBtns);

	let delBtn = document.createElement('button')
	delBtn.id = 'del-' + sno;

	delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
	delBtn.className = 'btn btn-danger me-2';
	delBtn.setAttribute("data-bs-toggle", 'modal');
	delBtn.setAttribute("data-bs-target", '#actionModals');
    delBtn.addEventListener('click', LoadModals);
    td7.append(delBtn);
	
	trow.append(td2,td3,td4,td5,td7);
	
	tbody.append(trow);
	

}
const AddAllRecords = () =>{
	sno=0;
	tbody.innerHTML = ""; 
	spendlist.forEach(spend =>{
		AddSingleRecords( spend.info, spend.dateday, spend.datemonth, spend.dateyear, spend.money, spend.is, spend.ids);

 //document.getElementById("see").innerText += text + '\n';
 

//const jn = JSON.parse(text);('id: '+ text);
  //console.log(text)
  
  //console.log(jn)

	})
			return onValue(ref(db, uidc + '/spend'), (snapshot) => {
		
		const money = (snapshot.val() && snapshot.val().money);
		//console.log(money)
		})
		
}
let exs = document.getElementById('exs');
let actionLabel = document.getElementById('actionLabels');
let modiss = document.getElementById('modiss');
let deles = document.getElementById('deles');
const LoadModals = (event) => {

    var targetId = (event.target.id.length > 1 ) ? event.target.id : event.target.parentElement.id;

    let string = targetId.split('-');
    let mode = string[0];
    let selectedIndex = string[1] - 1;

   

    if(mode==='edit'){

        actionLabels.innerText = 'آیا پول مصرف شده تایید می شود؟';
        modiss.addEventListener('click', UpdDatas);

        modidss.value = spendlist[selectedIndex].ids;
        modiss.value = spendlist[selectedIndex].is;

        modidss.style.display = "none";
		 deles.style.display = "none";
        deles.disabled = true;
        modidss.disabled = true;
		modiss.disabled = false;
		modiss.style.display = "block";

    }
	else if(mode==='del'){
		actionLabels.innerText = 'برای حذف نمودن تایید کنید';
        deles.addEventListener('click', delData);

        modids.value = spendlist[selectedIndex].ids;
		
		modidss.style.display = "none";
		modiss.style.display = "none";
		deles.disabled = false;
		modiss.disabled = true;
		deles.style.display = "block";
		 

    }

}
const delData = () => {
		remove(ref(db, uidc +  '/spend/' + ssearchyear + '/' + ssearchmonth + '/' + modidss.value)).then(() => {
			exs.click();
			let d = 'spend';
			update(ref(db),{
				page: d,
			})
			});
		
}
var elem = document.getElementById("modiss");
const UpdDatas = () => {
    let data = {};

	
switch(elem.value) {
	case "خیر":
		elem.value = 'بله';
		data[uidc +  '/spend/' + ssearchyear + '/' + ssearchmonth + '/'+ modidss.value + '/is'] = elem.value;
		update(ref(db), data).then(() => {
			exoo.click();
			let v = 'spend';
			update(ref(db),{
				page: v,
			})
			window.location.reload();
			})
		//window.addEventListener('load', selectAllDataRealtime());
		break;
	case "بله":
		elem.value = 'خیر';
		data[uidc +  '/spend/' + ssearchyear + '/' + ssearchmonth + '/'+ modidss.value + '/is'] = elem.value;
		update(ref(db), data).then(() => {
			exs.click();
			let v = 'spend';
			update(ref(db),{
				page: v,
			})
			window.location.reload();
		})
		//window.addEventListener('load', selectAllDataRealtime());
		
		break;
}


}




window.addEventListener('load', selectAllDataRealtime());
//const topUserPostsRef = query(ref(db, uid + '/recived/2i2uzTCuNdznHqOroj6V7jreVeO8Y367'), orderByChild('money'));
//console.log(topUserPostsRef)

		})
		
		  const sear = () =>{
	const dbRefs = ref(db, uidc);
	onValue(dbRefs, (snapshot) => {
		snapshot.forEach(shop =>{
			let mon = shop.child("assearchm").val();
			let yea = shop.child("assearchy").val();
			switch(mon){
				case '01':{
					document.getElementById("ssearchmonth").selectedIndex = 0;
					document.getElementById('ssearch').click();
					break;
				}
				case '02':{
					document.getElementById("ssearchmonth").selectedIndex = 1;
					document.getElementById('ssearch').click();
					break;
				}
				case '03':{
					document.getElementById("ssearchmonth").selectedIndex = 2;
					document.getElementById('ssearch').click();
					break;
				}
				case '04':{
					document.getElementById("ssearchmonth").selectedIndex = 3;
					document.getElementById('ssearch').click();
					break;
				}
				case '05':{
					document.getElementById("ssearchmonth").selectedIndex = 4;
					document.getElementById('ssearch').click();
					break;
				}
				case '06':{
					document.getElementById("ssearchmonth").selectedIndex = 5;
					document.getElementById('ssearch').click();
					break;
				}
				case '07':{
					document.getElementById("ssearchmonth").selectedIndex = 6;
					document.getElementById('ssearch').click();
					break;
				}
				case '08':{
					document.getElementById("ssearchmonth").selectedIndex = 7;
					document.getElementById('ssearch').click();
					break;
				}
				case '09':{
					document.getElementById("ssearchmonth").selectedIndex = 8;
					document.getElementById('ssearch').click();
					break;
				}
				case '10':{
					document.getElementById("ssearchmonth").selectedIndex = 9;
					document.getElementById('ssearch').click();
					break;
				}
				case '11':{
					document.getElementById("ssearchmonth").selectedIndex = 10;
					document.getElementById('ssearch').click();
					break;
				}
				case '12':{
					document.getElementById("ssearchmonth").selectedIndex = 11;
					document.getElementById('ssearch').click();
					break;
				}
				
			}
			switch(yea){
				case '1403':{
					document.getElementById("ssearchyear").selectedIndex = 0;
					document.getElementById('ssearch').click();
					break;
				}
				case '1404':{
					document.getElementById("ssearchyear").selectedIndex = 1;
					document.getElementById('ssearch').click();
					break;
				}
				case '1405':{
					document.getElementById("ssearchyear").selectedIndex = 2;
					document.getElementById('ssearch').click();
					break;
				}
				case '1406':{
					document.getElementById("ssearchyear").selectedIndex = 3;
					document.getElementById('ssearch').click();
					break;
				}
				case '1407':{
					document.getElementById("ssearchyear").selectedIndex = 4;
					document.getElementById('ssearch').click();
					break;
				}
				case '1408':{
					document.getElementById("ssearchyear").selectedIndex = 5;
					document.getElementById('ssearch').click();
					break;
				}
				case '1409':{
					document.getElementById("ssearchyear").selectedIndex = 6;
					document.getElementById('ssearch').click();
					break;
				}
				case '1410':{
					document.getElementById("ssearchyear").selectedIndex = 7;
					document.getElementById('ssearch').click();
					break;
				}
			}
			
			
		});
	})

}

			window.addEventListener('load', sear());
			

		
		
	};
