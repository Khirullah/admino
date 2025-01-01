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
secko()
document.getElementById("jaido").onchange = function() {secko()};
function secko(){
            let jaid = document.getElementById('jaido');
            var valuea = jaid.value;
            var text = jaid.options[jaid.selectedIndex].text;
			switch(valuea){
				case 'almas':{
					var uidc = "8Vxgxu8C1ZMTGdZCXyCKINVL9lg2";
					break;
				}
				case 'kota':{
					var uidc = "TKsxwHQnaleL3YZxv34wykBm4Yb2";
					break;
				}
				case 'pul':{
					var uidc = "5GX14bgXFFfougpqulk0SQBKb732";
					break;
				}
			}
		

			
const osearch = document.getElementById('osearch');
osearch.addEventListener('click', () => {
	var osearchmonth = document.getElementById('osearchmonth').value;
	var osearchyear = document.getElementById('osearchyear').value;
	update(ref(db, uidc + "/" + "owner"),{
			aosearchm: osearchmonth,
			aosearchy: osearchyear,
},);

function GetAllDataOnce(){
	const que = query(ref(db, uidc), orderByChild("owner"));
	
	get(que).then((snapshot)=>{
		var data = [];
		
		snapshot.forEach(childSnapshot =>{
			data.push(childSnapshot.val());
		});
		console.log(data)
	
	})
}
let ownerlist = [];
let sno = 0;
let tbody = document.getElementById('tbody2');


const selectAllDataOnce = () =>{
	const dbRefs = ref(db);
	get(child(dbRefs, uidc + '/owner')).then((snapshot)=>{
		ownerlist = [];
		snapshot.forEach(owner =>{
			ownerlist.push(owner.val());
			
		});
		AddAllRecords();
	
	})

}


const selectAllDataRealtime = () =>{
	const dbRefs = ref(db, uidc + '/owner' + '/' + osearchyear + '/' + osearchmonth);
	onValue(dbRefs, (snapshot) => {
		ownerlist = [];
		snapshot.forEach(owner =>{
			ownerlist.push(owner.val());
			//let toint = shop.child("is").val();
			//let total = parseInt(toint);
			//console.log(total)
		});
	

		AddAllRecords();
		
				var table = document.getElementById("tbody2"), sumVal = 0;
            
            for(var i = 0; i < table.rows.length; i++)
            {
                //sumVal = sumVal + parseInt(table.rows[i].cells[2].innerHTML);
				var aa = table.rows[i].cells[1].innerHTML.toEnglishDigits();
				var aaa = parseInt(aa);
                sumVal = sumVal + aaa;
            }
            var ao = sumVal.toString();
            //document.getElementById("val").innerHTML = "Sum Value = " + sumVal;
			let ototal = document.getElementById('ototal');
			ototal.innerHTML = 'مبلغ ' + ao.toPersianDigits().bold() + ' در ماه ' + osearchmonth.toPersianDigits() + ' ' + 'سال ' + osearchyear.toPersianDigits();
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


const AddSingleRecords = (dateday, datemonth, dateyear, money, is, ids) => {
	let trow = document.createElement('tr');
	let td1 = document.createElement('td');
	let td2 = document.createElement('td');
	let td3 = document.createElement('td');
	let td4 = document.createElement('td');
    let td5 = document.createElement('td');
	let td6 = document.createElement('td');
	
	
	
	td1.innerHTML = ++sno;
	td2.innerHTML = dateday.toPersianDigits() + '/' + datemonth.toPersianDigits() + '/' + dateyear.toPersianDigits();
	td3.innerHTML = money.toPersianDigits();
	//td4.innerHTML = is;
	td5.innerHTML = ids;

	

	let EditBtn = document.createElement('button')

	EditBtn.id = 'edit-' + sno;

	EditBtn.className = 'btn btn-primary me-2';
	EditBtn.innerHTML = is;
	EditBtn.setAttribute("data-bs-toggle", 'modal');
	EditBtn.setAttribute("data-bs-target", '#actionModal');
    EditBtn.addEventListener('click', LoadModal);
	td4.append(EditBtn);
	
	let delBtn = document.createElement('button')
	delBtn.id = 'del-' + sno;

	delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
	delBtn.className = 'btn btn-danger me-2';
	delBtn.setAttribute("data-bs-toggle", 'modal');
	delBtn.setAttribute("data-bs-target", '#actionModal');
    delBtn.addEventListener('click', LoadModal);
    td6.append(delBtn);

	

	
	trow.append(td2,td3,td4,td6);
	
	tbody.append(trow);
	

}
const AddAllRecords = () =>{
	
	sno=0;
	tbody.innerHTML = ""; 
	ownerlist.forEach(owner =>{
		AddSingleRecords(owner.dateday, owner.datemonth, owner.dateyear, owner.money, owner.is, owner.ids);
    //console.log(a[0])

	})
			return onValue(ref(db, uidc + '/owner'), (snapshot) => {
		
		const money = (snapshot.val() && snapshot.val().money);
		//console.log(money)
		})
	
}

let exoo = document.getElementById('exoo');
let exo = document.getElementById('exo');
let actionLabel = document.getElementById('actionLabel');
let actionLabelo = document.getElementById('actionLabelo');
let modids = document.getElementById('modids');
let elem = document.getElementById("modis");
let deloko = document.getElementById('odelete');

const LoadModal = (event) => {

    var targetId = (event.target.id.length > 1 ) ? event.target.id : event.target.parentElement.id;

    let string = targetId.split('-');
    let mode = string[0];
    let selectedIndex = string[1] - 1;

   

    if(mode==='edit'){

        actionLabel.innerText = 'آیا پول برای مالک جایدات رسیده؟';
        elem.addEventListener('click', UpdData);

        modids.value = ownerlist[selectedIndex].ids;
        elem.value = ownerlist[selectedIndex].is;

        modids.style.display = "none";
        deloko.style.display = "none";
        exo.style.display = "none";
        actionLabelo.style.display = "none";
		elem.style.display = "block";
		exoo.style.display = "block";
		actionLabel.style.display = "block";
        //modis.disabled = false;
        modids.disabled = true;

    }else if(mode==='del'){
		actionLabelo.innerText = 'برای حذف نمودن تایید کنید';
        deloko.addEventListener('click', delData);

        modids.value = ownerlist[selectedIndex].ids;
		elem.value = ownerlist[selectedIndex].is;

		actionLabel.style.display = "none";
        modids.style.display = "none";
		elem.style.display = "none";
		exoo.style.display = "none";
		deloko.style.display = "block";
        exo.style.display = "block";
        actionLabelo.style.display = "block";
        modids.disabled = true;

    }

}
const delData = () => {
		remove(ref(db, uidc +  '/owner/' + osearchyear + '/' + osearchmonth + '/' + modids.value)).then(() => {
			exo.click();
			let d = 'owner';
			update(ref(db),{
				page: d,
			})
			});
		
}
const UpdData = () => {
    let data = {};
    //if (modis=="خیر"){
    //    elem.value = "بله";
    //} else elem.value = "خیر";
switch(elem.value) {
	case "خیر":
		elem.value = 'بله';
		data[uidc +  '/owner/' + osearchyear + '/' + osearchmonth + '/' + modids.value + '/is'] = elem.value;
		update(ref(db), data).then(() => {
			exoo.click();
			let v = 'owner';
			update(ref(db),{
				page: v,
			})
			window.location.reload();
			})
		//window.addEventListener('load', selectAllDataRealtime());
		break;
	case "بله":
		elem.value = 'خیر';
		data[uidc +  '/owner/' + osearchyear + '/' + osearchmonth + '/' + modids.value + '/is'] = elem.value;
		update(ref(db), data).then(() => {
			exoo.click();
			let v = 'owner';
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
})
		  const sear = () =>{
	const dbRefs = ref(db, uidc);
	onValue(dbRefs, (snapshot) => {
		snapshot.forEach(shop =>{
			let mon = shop.child("aosearchm").val();
			let yea = shop.child("aosearchy").val();
			switch(mon){
				case '01':{
					document.getElementById("osearchmonth").selectedIndex = 0;
					document.getElementById('osearch').click();
					break;
				}
				case '02':{
					document.getElementById("osearchmonth").selectedIndex = 1;
					document.getElementById('osearch').click();
					break;
				}
				case '03':{
					document.getElementById("osearchmonth").selectedIndex = 2;
					document.getElementById('osearch').click();
					break;
				}
				case '04':{
					document.getElementById("osearchmonth").selectedIndex = 3;
					document.getElementById('osearch').click();
					break;
				}
				case '05':{
					document.getElementById("osearchmonth").selectedIndex = 4;
					document.getElementById('osearch').click();
					break;
				}
				case '06':{
					document.getElementById("osearchmonth").selectedIndex = 5;
					document.getElementById('osearch').click();
					break;
				}
				case '07':{
					document.getElementById("osearchmonth").selectedIndex = 6;
					document.getElementById('osearch').click();
					break;
				}
				case '08':{
					document.getElementById("osearchmonth").selectedIndex = 7;
					document.getElementById('osearch').click();
					break;
				}
				case '09':{
					document.getElementById("osearchmonth").selectedIndex = 8;
					document.getElementById('osearch').click();
					break;
				}
				case '10':{
					document.getElementById("osearchmonth").selectedIndex = 9;
					document.getElementById('osearch').click();
					break;
				}
				case '11':{
					document.getElementById("osearchmonth").selectedIndex = 10;
					document.getElementById('osearch').click();
					break;
				}
				case '12':{
					document.getElementById("osearchmonth").selectedIndex = 11;
					document.getElementById('osearch').click();
					break;
				}
				
			}
			switch(yea){
				case '1403':{
					document.getElementById("osearchyear").selectedIndex = 0;
					document.getElementById('osearch').click();
					break;
				}
				case '1404':{
					document.getElementById("osearchyear").selectedIndex = 1;
					document.getElementById('osearch').click();
					break;
				}
				case '1405':{
					document.getElementById("osearchyear").selectedIndex = 2;
					document.getElementById('osearch').click();
					break;
				}
				case '1406':{
					document.getElementById("osearchyear").selectedIndex = 3;
					document.getElementById('osearch').click();
					break;
				}
				case '1407':{
					document.getElementById("osearchyear").selectedIndex = 4;
					document.getElementById('osearch').click();
					break;
				}
				case '1408':{
					document.getElementById("osearchyear").selectedIndex = 5;
					document.getElementById('osearch').click();
					break;
				}
				case '1409':{
					document.getElementById("osearchyear").selectedIndex = 6;
					document.getElementById('osearch').click();
					break;
				}
				case '1410':{
					document.getElementById("osearchyear").selectedIndex = 7;
					document.getElementById('osearch').click();
					break;
				}
			}
			
			
		});
	})

}

			window.addEventListener('load', sear());
};
