import { onAuthStateChanged, getAuth} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, child, get, onValue, push, update, query, orderByChild, onChildAdded, limitToFirst, limitToLast, 
startAt, startAfter, endAt, endBefore, equalTo} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {firebaseConfig} from './config.js';
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseApps = initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
const db = getDatabase();

	
	
		
//const topUserPostsRef = query(ref(db, uid), orderByChild('name'));
//console.log(topUserPostsRef)
const saa = document.getElementById("saa");
saa.addEventListener("click", () => {
	


            let jaid = document.getElementById('jaid');
            var valuea = jaid.value;
            var text = jaid.options[jaid.selectedIndex].text;
			switch(valuea){
				case 'bahar':{
					var uidc = "Hnh29IoL4vUZbtVCxcmaqL3m4Nm1";
					break;
				}
				case 'bist':{
					var uidc = "7i1QwjmEeYN2qugJenyoWfThzuf1"
					break;
				}
				case 'qala':{
					var uidc = "IWPA8IT55mVlavd758jBQx8WLWb2";
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
                sumVal = sumVal + parseInt(table.rows[i].cells[3].innerHTML);
            }
            
            //document.getElementById("val").innerHTML = "Sum Value = " + sumVal;
			let total = document.getElementById('total');
			total.innerHTML = 'به مبلغ ' + sumVal + ' ماه  ' + searchmonth + ' ' + 'سال ' + searchyear;
            console.log(sumVal);
	
	})

}
const AddSingleRecords = (name, dateday, datemonth, dateyear, money) => {
	let trow = document.createElement('tr');
	let td1 = document.createElement('td');
	let td2 = document.createElement('td');
	let td3 = document.createElement('td');
	let td4 = document.createElement('td');
	let td5 = document.createElement('td');
	
	
	
	td1.innerHTML = ++sno;
	td2.innerHTML = name;
	td3.innerHTML = dateday + '/' + datemonth + '/' + dateyear;;
	td4.innerHTML = money;

	
	trow.append(td1,td2,td3,td4);
	
	tbody.append(trow);
	

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
});

document.getElementById('saa').click();
//const topUserPostsRef = query(ref(db, uid + '/recived/2i2uzTCuNdznHqOroj6V7jreVeO8Y367'), orderByChild('money'));
//console.log(topUserPostsRef)
