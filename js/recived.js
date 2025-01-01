import { onAuthStateChanged, getAuth} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, child, get, onValue, push, update, query, orderByChild, onChildAdded, limitToFirst, limitToLast, 
startAt, startAfter, endAt, endBefore, equalTo, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {firebaseConfig} from './config.js';
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseApps = initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
const db = getDatabase();



//const topUserPostsRef = query(ref(db, uid), orderByChild('name'));
//console.log(topUserPostsRef)
seck()
document.getElementById("jaid").onchange = function() {seck()};
function seck(){
	
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

const search = document.getElementById('search');
search.addEventListener('click', () => {
	var searchmonth = document.getElementById('searchmonth').value;
	var searchyear = document.getElementById('searchyear').value;
		update(ref(db, uidc + "/" + "recived"),{
			asearchm: searchmonth,
			asearchy: searchyear,
	},);
function GetAllDataOnce(){
	const que = query(ref(db, uidc), orderByChild("recived"));
	
	get(que).then((snapshot)=>{
		var data = [];
		
		snapshot.forEach(childSnapshot =>{
			data.push(childSnapshot.val());
		});
		console.log(data)
	
	})
}
let shoplist = [];
let sno = 0;
let tbody = document.getElementById('tbody1');
const selectAllDataOnce = () =>{
	const dbRefs = ref(db);
	get(child(dbRefs, uidc + '/recived')).then((snapshot)=>{
		shoplist = [];
		snapshot.forEach(shop =>{
			shoplist.push(shop.val());
			
		});
		AddAllRecords();
	
	})

}


const selectAllDataRealtime = () =>{
	const dbRefs = ref(db, uidc + '/recived' + '/' + searchyear + '/' + searchmonth);
	onValue(dbRefs, (snapshot) => {
		shoplist = [];
		snapshot.forEach(shop =>{
			shoplist.push(shop.val());
			//let toint = shop.child("is").val();
			//let total = parseInt(toint);
			//console.log(total)
		});
	

		
		AddAllRecords();
		
				var table = document.getElementById("tbody1"), sumVal = 0;
            
            for(var i = 0; i < table.rows.length; i++)
            {
				var aa = table.rows[i].cells[2].innerHTML.toEnglishDigits();
				var aaa = parseInt(aa);
                sumVal = sumVal + aaa;
				
            }
            var a = sumVal.toString();
            //document.getElementById("val").innerHTML = "Sum Value = " + sumVal;
			let total = document.getElementById('total');
			total.innerHTML = 'مجموعه ماه  ' +   searchmonth.toPersianDigits() + ' ' + 'سال ' + searchyear.toPersianDigits() + ' : ' + a.toPersianDigits().bold();
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



const AddSingleRecords = (name, dateday, datemonth, dateyear, money) => {
	let trow = document.createElement('tr');
	let td1 = document.createElement('td');
	let td2 = document.createElement('td');
	let td3 = document.createElement('td');
	let td4 = document.createElement('td');
	let td5 = document.createElement('td');
	
	
	
	td1.innerHTML = ++sno;
	td2.innerHTML = name;
	td3.innerHTML = dateday.toPersianDigits() + '/' + datemonth.toPersianDigits() + '/' + dateyear.toPersianDigits();
	td4.innerHTML = money.toPersianDigits();
	
	let delBtn = document.createElement('button')
	delBtn.id = 'del-' + sno;

	delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
	delBtn.className = 'btn btn-danger me-2';
	delBtn.setAttribute("data-bs-toggle", 'modal');
	delBtn.setAttribute("data-bs-target", '#actionModala');
    delBtn.addEventListener('click', LoadModal);
    td5.append(delBtn);
	
	trow.append(td2,td3,td4,td5);
	
	tbody.append(trow);
	

}
let ex = document.getElementById('exa');
let modids = document.getElementById('modidsa');
let delok = document.getElementById('delete');
let actionLabel = document.getElementById('actionLabela');
const LoadModal = (event) => {

    var targetId = (event.target.id.length > 1 ) ? event.target.id : event.target.parentElement.id;

    let string = targetId.split('-');
    let mode = string[0];
    let selectedIndex = string[1] - 1;

   

    if(mode==='del'){
		actionLabel.innerText = 'برای حذف نمودن تایید کنید';
        delok.addEventListener('click', delData);

        modidsa.value = shoplist[selectedIndex].ids;
        //modis.value = ownerlist[selectedIndex].is;

        modidsa.style.display = "none";
        //modis.disabled = false;
        modidsa.disabled = true;

    }

}
const delData = () => {
		remove(ref(db, uidc +  '/recived/' + searchyear + '/' + searchmonth + '/' + modidsa.value)).then(() => {
			ex.click(); 
			let d = 'recived';
			update(ref(db),{
				page: d,
			})
			});
		
}
const AddAllRecords = () =>{
	sno=0;
	tbody.innerHTML = ""; 
	shoplist.forEach(shop =>{
		AddSingleRecords(shop.name, shop.dateday, shop.datemonth, shop.dateyear, shop.money);

 //document.getElementById("see").innerText += text + '\n';
 

//const jn = JSON.parse(text);('id: '+ text);
  //console.log(text)
  
  //console.log(jn)

	})

		




}

window.addEventListener('load', selectAllDataRealtime());
})
		  const sear = () =>{
	const dbRefs = ref(db, uidc);
	onValue(dbRefs, (snapshot) => {
		snapshot.forEach(shop =>{
			let mon = shop.child("asearchm").val();
			let yea = shop.child("asearchy").val();
			switch(mon){
				case '01':{
					document.getElementById("searchmonth").selectedIndex = 0;
					document.getElementById('search').click();
					break;
				}
				case '02':{
					document.getElementById("searchmonth").selectedIndex = 1;
					document.getElementById('search').click();
					break;
				}
				case '03':{
					document.getElementById("searchmonth").selectedIndex = 2;
					document.getElementById('search').click();
					break;
				}
				case '04':{
					document.getElementById("searchmonth").selectedIndex = 3;
					document.getElementById('search').click();
					break;
				}
				case '05':{
					document.getElementById("searchmonth").selectedIndex = 4;
					document.getElementById('search').click();
					break;
				}
				case '06':{
					document.getElementById("searchmonth").selectedIndex = 5;
					document.getElementById('search').click();
					break;
				}
				case '07':{
					document.getElementById("searchmonth").selectedIndex = 6;
					document.getElementById('search').click();
					break;
				}
				case '08':{
					document.getElementById("searchmonth").selectedIndex = 7;
					document.getElementById('search').click();
					break;
				}
				case '09':{
					document.getElementById("searchmonth").selectedIndex = 8;
					document.getElementById('search').click();
					break;
				}
				case '10':{
					document.getElementById("searchmonth").selectedIndex = 9;
					document.getElementById('search').click();
					break;
				}
				case '11':{
					document.getElementById("searchmonth").selectedIndex = 10;
					document.getElementById('search').click();
					break;
				}
				case '12':{
					document.getElementById("searchmonth").selectedIndex = 11;
					document.getElementById('search').click();
					break;
				}
				
			}
			switch(yea){
				case '1403':{
					document.getElementById("searchyear").selectedIndex = 0;
					document.getElementById('search').click();
					break;
				}
				case '1404':{
					document.getElementById("searchyear").selectedIndex = 1;
					document.getElementById('search').click();
					break;
				}
				case '1405':{
					document.getElementById("searchyear").selectedIndex = 2;
					document.getElementById('search').click();
					break;
				}
				case '1406':{
					document.getElementById("searchyear").selectedIndex = 3;
					document.getElementById('search').click();
					break;
				}
				case '1407':{
					document.getElementById("searchyear").selectedIndex = 4;
					document.getElementById('search').click();
					break;
				}
				case '1408':{
					document.getElementById("searchyear").selectedIndex = 5;
					document.getElementById('search').click();
					break;
				}
				case '1409':{
					document.getElementById("searchyear").selectedIndex = 6;
					document.getElementById('search').click();
					break;
				}
				case '1410':{
					document.getElementById("searchyear").selectedIndex = 7;
					document.getElementById('search').click();
					break;
				}
			}
			
			
		});
	})

}

			window.addEventListener('load', sear());
};
//const topUserPostsRef = query(ref(db, uid + '/recived/2i2uzTCuNdznHqOroj6V7jreVeO8Y367'), orderByChild('money'));
//console.log(topUserPostsRef)
