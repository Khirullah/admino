import { onAuthStateChanged, getAuth} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { initializeApp, getApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, child, get, onValue, push, update, query, orderByChild, onChildAdded, limitToFirst, limitToLast, 
startAt, startAfter, endAt, endBefore, equalTo} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {firebaseConfig} from './config.js';
//const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseApps = initializeApp(firebaseConfig);
//const auth = firebase.auth();
//const firestore = firebase.firestore();
const db = getDatabase();
const saa = document.getElementById("saa");
saa.addEventListener("click", () => {
            let jaid = document.getElementById('jaid');
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
                sumVal = sumVal + parseInt(table.rows[i].cells[2].innerHTML);
            }
            
            //document.getElementById("val").innerHTML = "Sum Value = " + sumVal;
			let ototal = document.getElementById('ototal');
			ototal.innerHTML = 'مبلغ ' + sumVal + ' در ماه ' + osearchmonth + ' ' + 'سال ' + osearchyear + " رسیده است ";
            console.log(sumVal);
	
	})

}
const AddSingleRecords = (dateday, datemonth, dateyear, money, is, ids) => {
	let trow = document.createElement('tr');
	let td1 = document.createElement('td');
	let td2 = document.createElement('td');
	let td3 = document.createElement('td');
	let td4 = document.createElement('td');
    let td5 = document.createElement('td');
	let td6 = document.createElement('td');
	
	
	
	td1.innerHTML = ++sno;
	td2.innerHTML = dateday + '/' + datemonth + '/' + dateyear;
	td3.innerHTML = money;
	td4.innerHTML = is;
	//td5.innerHTML = ids;

	

	let EditBtn = document.createElement('button')

	EditBtn.id = 'edit-' + sno;

	EditBtn.className = 'btn btn-primary me-2';
	EditBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
	EditBtn.setAttribute("data-bs-toggle", 'modal');
	EditBtn.setAttribute("data-bs-target", '#actionModal');
    EditBtn.addEventListener('click', LoadModal);

	td6.append(EditBtn);

	
	trow.append(td1,td2,td3,td4, td6);
	
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

let ex = document.getElementById('ex');
let actionLabel = document.getElementById('actionLabel');
let moddate = document.getElementById('moddate');
let modmoney = document.getElementById('modmoney');
let modids = document.getElementById('modids');
let modis = document.getElementById('modis');
let addBtn = document.getElementById('add-0');

const LoadModal = (event) => {

    var targetId = (event.target.id.length > 1 ) ? event.target.id : event.target.parentElement.id;

    let string = targetId.split('-');
    let mode = string[0];
    let selectedIndex = string[1] - 1;

   

    if(mode==='edit'){

        actionLabel.innerText = 'آیا پول برای مالک جایدات رسیده؟';
        modis.addEventListener('click', UpdData);

        modids.value = ownerlist[selectedIndex].ids;
        //modis.value = ownerlist[selectedIndex].is;

        modids.style.display = "none";
        //modis.disabled = false;
        modids.disabled = true;

    }

}
var elem = document.getElementById("modis");
var isis = '';
const UpdData = () => {
    let data = {};
    //if (modis=="خیر"){
    //    elem.value = "بله";
    //} else elem.value = "خیر";
switch(elem.value) {
	case "خیر":
		isis = 'بله';
		elem.value = 'بله';
		break;
	case "بله":
		isis = "خیر";
		elem.value = 'خیر';
		break;
}
	
    data[uidc +  '/owner/' + osearchyear + '/' + osearchmonth + '/' + modids.value + '/is'] = isis;


    update(ref(db), data).then(() => {ex.click(); })

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
});
document.getElementById('saa').click();
