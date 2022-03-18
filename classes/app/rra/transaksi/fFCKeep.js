window.app_rra_transaksi_fFCKeep = function(owner)
{
	if (owner)
	{
		window.app_rra_transaksi_fFCKeep.prototype.parent.constructor.call(this,owner);
		this.className  = "app_rra_transaksi_fFCKeep";
		this.itemsValue = new arrayList();
		if (this.showLoading) this.showLoading("Generate UI");
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form PDRK RRA Anggaran: Release Budget FC", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;util_rfc;server_report_report;util_rfcLib;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.c_modul = new saiCB(this,{bound:[20,22,200,20],caption:"Modul",items:["RRR","OPN","STB"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.e_uid = new saiLabelEdit(this,{bound:[720,22,200,20], caption:"SAP User", tag:11});
		this.c_jenis = new saiCB(this,{bound:[20,23,200,20],caption:"Jenis",items:["CAPEX","OPEX"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.i_postAll = new portalui_imageButton(this,{bound:[225,23,20,20],hint:"App All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_manual = new checkBox(this,{bound:[250,23,150,20], caption:"Proses Tanpa Keep SAP"});
		this.e_pwd = new saiLabelEdit(this,{bound:[720,23,200,20], caption:"SAP Password", password:true, tag:11});
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,287], childPage:["Data RRA","Detail Transaksi","PDRK - 1","PDRK - 2","PDRK - 3","PDRK - 4(CAPEX)"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:6,tag:0,
		            colTitle:["Status","No Bukti","No Dokumen","Tanggal","Keterangan","Jenis"],
					colWidth:[[5,4,3,2,1,0],[50,290,70,200,150,80]],
					columnReadOnly:[true,[0,1,2,3,4,5],[]],
					buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
					change:[this,"doChangeCells"],dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:11,tag:9,
					colTitle:["Bulan","Kode CC","Nama CC","Kode DRK","Nama DRK","Kode Akun","Nama Akun","Jenis","Nilai","Target","Nilai Keep"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[100,100,130,80,150,70,60,60,150,70,50]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10],[]],
					colFormat:[[8],[cfNilai]],
					defaultRow:1,autoAppend:false});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		var cnv = this.pc1.childPage[2].getClientCanvas();
		this.docPDRK1 = document.createElement("iframe");
		this.docPDRK1.frameBorder = 0;
		this.docPDRK1.id = this.getFullId()+"_pdrk1";
		this.docPDRK1.style.cssText = "width:100%;height:100%;background:#ffffff";
		cnv.appendChild(this.docPDRK1);
		cnv = this.pc1.childPage[3].getClientCanvas();
		this.docPDRK2 = document.createElement("iframe");
		this.docPDRK2.frameBorder = 0;
		this.docPDRK2.id = this.getFullId()+"_pdrk2";
		this.docPDRK2.style.cssText = "width:100%;height:100%;background:#ffffff";
		cnv.appendChild(this.docPDRK2);
		cnv = this.pc1.childPage[4].getClientCanvas();
		this.docPDRK3 = document.createElement("iframe");
		this.docPDRK3.frameBorder = 0;
		this.docPDRK3.id = this.getFullId()+"_pdrk3";
		this.docPDRK3.style.cssText = "width:100%;height:100%;background:#ffffff";
		cnv.appendChild(this.docPDRK3);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.rfc = new util_rfc();											
			this.rfcLib = new util_rfcLib();
			this.login = new server_util_Map();
			this.login.set("periode",this.app._periodeGAR);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.c_modul.setText("");
			this.report = new server_report_report();
		}catch(e){
			systemAPI.alert(e);
		}
		this.hideLoading("Generate UI");
	}
};
window.app_rra_transaksi_fFCKeep.extend(window.childForm);
window.app_rra_transaksi_fFCKeep.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	showAlert: function(res, data, proses){
		var status = "";
		var hasExReturn = false;
		for (var i in res.objList){									
			if (res.get("ex_return") == "FAILED"){
					var line, text = "";
					hasExReturn = true;
					for (var l in res.get("log").objList){
						line = res.get("log").get(l);
						for (var m in line.objList){
							for (var g in line.get(m).objList)
								text += m+":"+line.get(m).get(g);
							text += "<br>";
						}
					}					
					if (res.get("errlog")){
						for (var l in res.get("errlog").objList){
							line = res.get("errlog").get(l);
							for (var m in line.objList){
								for (var g in line.get(m).objList)
									text += m+":"+line.get(m).get(g);
								text += "<br>";
							}
						}
					}
					var dt = "";
					for (var o in data.objList) {
						if (dt != "") dt += ",";
						dt += o+":"+data.get(o);
					}
					/*
					var tSaldo,sld = this.rfc.cekSaldo(this.login, this.e_periode.getText().substr(0,4),"01",data.get("bln").substr(1),data.get("cc"),data.get("akun"),"1000","1000","64","0");					
					
					if (typeof sld == "string"){						
						tSaldo = "";
					}else {
						var restable = sld.get("restable");
						var tmp = restable.get("0");
						tSaldo = "";
						for (var s in tmp.objList){
							if (tSaldo != "") tSaldo += ", ";							
							tSaldo += s+":"+tmp.get(s);
						}						
					}*/
					system.alert(this,"Error RFC:"+proses+"<br>"+dt+"<br>",text);
					return;
			}
			if (!hasExReturn){
				for (var r in res.get(i).objList){										
					var status = res.get(i).get("ex_return");
					if (status == 'FAILED'){					
						var line, text = "";
						for (var l in res.get(i).get("log").objList){
							line = res.get(i).get("log").get(l);
							for (var m in line.objList){
								for (var g in line.get(m).objList)
									text += m+":"+line.get(m).get(g);
								text += "<br>";
							}
						}						
						if (res.get("errlog")){
							for (var l in res.get("errlog").objList){
								line = res.get("errlog").get(l);
								for (var m in line.objList){
									for (var g in line.get(m).objList)
										text += m+":"+line.get(m).get(g);
									text += "<br>";
								}
							}
						}
						var dt = "";
						for (var o in data.objList) {
							if (dt != "") dt += ",";
							dt += o+":"+data.get(o);
						}
						/*var tSaldo,sld = this.rfc.cekSaldo(this.login, this.e_periode.getText().substr(0,4),"01",data.get("bln").substr(1),data.get("cc"),data.get("akun"),"1000","1000","64","0");					
						
						if (typeof sld == "string"){						
							tSaldo = "";
						}else {
							var restable = sld.get("restable");
							var tmp = restable.get("0");
							tSaldo = "";
							for (var s in tmp.objList){
								if (tSaldo != "") tSaldo += ", ";							
								tSaldo += s+":"+tmp.get(s);
							}						
						}					*/
						system.alert(this,"Error RFC:"+proses+"<br>"+dt+"<br>",text);
						return;
					}
				}
			}
		}
	},
	callRFC : function(func,imp, expTable, impTable, exp){
	   var login = new server_util_Map({items:{
			   user : this.e_uid.getText(),
			   passwd : this.e_pwd.getText()}
			   } );
	   var sapImp = new server_util_Map({items: imp});
	   var sapExpTable = new server_util_arrayList({items:expTable});
	   var sapImpTable = new server_util_Map({items: impTable});
	   exp = new server_util_arrayList({items:exp});
	   return this.rfcLib.callRFCSynch(login, func, sapImp, sapExpTable, sapImpTable, exp,  true);
   },
   getFundCtrAkun: function(wbs){
       var wbsOld = wbs;
       wbs = wbs.replace(/-/gi,"");
       var data = this.callRFC("ZFMFI_FMDERIVER",{IM_POSID: wbs},undefined, undefined,["EX_FIPEX","EX_FISTL","EX_GEBER"]);
       if (typeof data == "string"){
          system.alert(this,data,"");
          return false;
       }else {
          var fund = data.get("EX_GEBER");
          var fundCtr = data.get("EX_FISTL");
          this.fund = fund;
          var akun = data.get("EX_FIPEX");
          if (fund == "") {
              system.alert(this,"Fund tidak ditemukan untuk WBS "+wbsOld+" "+wbs,fundCtr+":"+akun);
              return false;
          }
       }
       if (akun == ""){
          //call From RollUpMinus
          var data = this.callRFC("ZFMFI_FUND",{
                  IM_FINCODE: fund,
                  IM_GJAHR:this.e_periode.getText().substr(0,4),
                  IM_KOKRS:"1000",
                  IM_VERSN:"000" },
                  ["T_RESULT"],undefined ,["EX_RETURN"]);
          if (typeof data == "string"){
              system.alert(this, data,"");
              return false;
          }else {
              var listAkun = new arrayList();
              var rows, line, expData = data.get("T_RESULT");
              for (var i in expData.objList){
                  rows = expData.get(i);
                  for (var j in rows.objList){
                      line = rows.get(j).getArray();
                      listAkun.add(line);
                      akun = line.FIPOS;
                  }
              }
          }
      }
       return {fund: fund,
               fundCtr : fundCtr,
               akun: akun};
   },
    release: function(fund, dataToAppend){
       return this.callRFC("ZFMFI_FR51_CAPEX",{
           IM_BATCH_INPUT: " ",
           IM_FIKRS : "1000",
           IM_FINCODE : fund,
           IM_GJAHR :this.e_periode.getText().substr(0,4),
           IM_KOKRS : "1000",
           IM_PERIO : "",
           IM_VERSN : "00" //if k = keduanya , c : 7 : commitment, p : 0 : payment
       },["TLOG","T_FR51"],{T_FR51 : dataToAppend},["EX_RETURN"] );
	},
	simpan: function(){			
		try{
			if (this.showLoading) this.showLoading("Silahkan tunggu.<br>Sedang diproses....!!!<br> initialization...");
			setTipeButton(tbAllFalse);
			this.login.set("user",this.e_uid.getText());
			this.login.set("passwd",this.e_pwd.getText());
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");					
					var noRRR = "' '";
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.status.toUpperCase() == "APP"){
							noRRR += ",'"+line.no_bukti+"'";
						}
					}
					if (!this.cb_manual.isChecked()){
						var dataAkun = new server_util_arrayList();
						var dataAkun2 = new server_util_arrayList();
						if (this.showLoading) this.showLoading("Silahkan tunggu.<br>Sedang diproses....!!!<br> ambil data sebelum posting...");
						if (this.c_modul.getText() == "OPN"){//open hold
							var data = this.dbLib.getDataProvider(
							"select jns, no_bukti, kode_akun, kode_cc, kode_drk, periode, nilai, prd,versi from ("+						
							"select 'FR' as jns,a.no_frev as no_bukti,a.kode_akun, a.kode_cc, a.kode_drk,substr(a.periode,5,2) as periode, a.nilai, a.periode as prd, a.jenis as versi  from rra_frev_d a where a.no_frev in ("+noRRR+") and dc='D' "+						
							") a order by versi,periode, kode_cc, kode_akun ",true);
						}else if (this.c_modul.getText() == "STB"){//standby budget
							var data = this.dbLib.getDataProvider(							
							"select 'FR' as jns,a.no_frev as no_bukti,a.kode_akun, a.kode_cc, a.kode_drk,substr(a.periode,5,2) as periode, a.nilai, a.periode as prd, a.jenis as versi  from rra_frev_d a where a.no_frev in ("+noRRR+") and dc='D' "+						
							" order by versi,periode, kode_cc, kode_akun ",true);
						}else var data = this.dbLib.getDataProvider(
							"select jns, no_bukti, kode_akun, kode_cc, kode_drk, periode, nilai, prd,versi from ("+
							"select 'UB' as jns,a.no_rev as no_bukti,a.kode_akun, a.kode_cc, a.kode_drk,substr(a.periode,5,2) as periode, ifnull(a.nilai_keep,a.nilai) as nilai, a.periode as prd, a.jenis as versi  from rra_rev_d a where a.no_rev in ("+noRRR+") and dc='C' "+
							" union "+
							"select 'GB',a.no_grev as no_bukti,a.kode_akun, a.kode_cc, a.kode_drk,substr(a.periode,5,2) as periode, ifnull(a.nilai_keep,a.nilai) as nilai, a.periode as prd, a.jenis as versi  from rra_grev_d a where a.no_grev in ("+noRRR+") and dc='C' "+
							" union "+
							"select 'MA',a.no_mrev as no_bukti,a.kode_akun, a.kode_cc, a.kode_drk,substr(a.periode,5,2) as periode, ifnull(a.nilai_keep,a.nilai) as nilai, a.periode as prd, a.jenis as versi  from rra_mrev_d a where a.no_mrev in ("+noRRR+") and dc='C' "+
							") a order by versi,periode, kode_cc, kode_akun ",true);
						
						if (typeof data != "string"){
							var line;
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								//Open Hold dan Standby Budget +
								//RRR -
								var nilai = (this.c_modul.getText() == "RRR" ? "-":"")+ parseFloat(line.nilai);
								//error_log(nilai);
								if (line.prd > this.app._periodeGAR)
									dataAkun2.add(new server_util_Map({items:{fikrs:"1000",
																			  kokrs:"1000",
																			  no_bukti:line.no_bukti,
																			  drk:line.kode_drk,
																			  jenis:line.jns,
																			  akun:line.kode_akun,
																			  cc:line.kode_cc,
																			  bln:"0"+line.periode,
																			  versi : line.versi,
																			  nilai: nilai}}));
								else 							
									dataAkun.add(new server_util_Map({items:{fikrs:"1000",
																			 kokrs:"1000",
																			 no_bukti:line.no_bukti,
																			 drk:line.kode_drk,
																			 jenis:line.jns,
																			 akun:line.kode_akun,
																			 cc:line.kode_cc,
																			 bln:"0"+line.periode,
																			 versi : line.versi,
																			 nilai: nilai }}));
							}
						}else {
							throw (data)						
						}
					
						if (this.showLoading) this.showLoading("Silahkan tunggu.<br>Sedang diproses....!!!<br> Release SAP (FR51)...");
						
						if (this.c_jenis.getText() == "OPEX"){
							if (dataAkun.getLength() > 0) {
								var res = this.rfc.release(this.login,  this.e_periode.getText().substr(0,4),dataAkun," ");
							}else var res = [];
						}else {
							var res = this.rfc.releaseCapex(this.login,  this.e_periode.getText().substr(0,4),dataAkun);
						}
						
						if (typeof res == "string")
						{
							//system.alert(this, "RFC Response:", res);
							throw (res);
							return false;
						}
											
						if (dataAkun.getLength() > 0) 
							var status = res.get("ex_return");					
						else var status = "SUCCESS";
						
						if (status == "FAILED"){			
							if (this.hideLoading) this.hideLoading("wait....");
							setTipeButton(tbSimpan);			
							var msg = res.get("msg");						
							for (var i in res.objList){							
								if (i == "log") {																					
									var line, text = "";
									for (var l in res.get("log").objList){
										line = res.get("log").get(l);
										for (var m in line.objList){
											for (var g in line.get(m).objList)
												text += m+":"+line.get(m).get(g);
											text += "<br>";
										}
									}
									var data = res.get("data");
									var dt = "";
									for (var o in data.objList) {
										if (dt != "") dt += ",";
										dt += o+":"+data.get(o);
									}
									var dataSuccess = res.get("success");
									var dtSuccess = "<table class='kotak' border=1><tr><td>No Review</td><td>Akun</td><td>Cost Center</td><td>Bulan</td><td>Nilai</td></tr>";
									for (var d in dataSuccess.objList){
										line = dataSuccess.get(d);
										dtSuccess += "<tr><td>"+line.get()+"</td>:<td>"+line.get("akun") +"</td>:<td>"+line.get("cc")+"</td>:<td>"+line.get("bln")+"</td>:<td>"+line.get("nilai")+"</td></tr>";
										
									}
									dtSuccess += "</table>";
									system.alert(this,"Error RFC:"+msg+"<br> "+ dt+"<br>"+text, dtSuccess);					
									return false;
								}
							}
							return;
						}
						if (status == "SUCCESS" || dataAkun.getLength() == 0){
							if (dataAkun2.getLength() > 0) {
								if (this.showLoading) this.showLoading("Silahkan tunggu.<br>Sedang diproses....!!!<br> Keep Plan (KP06, FM9C)...");
								var res = this.rfc.keepPlan(this.login,  this.e_periode.getText().substr(0,4),dataAkun2,"1000","1000"," ");
								if (typeof res == "string")
								{
									//system.alert(this, "RFC Response:", res);
									throw (res);
									return false;
								}
								var status = res.get("ex_return");																	
								if (status == "FAILED"){
									if (this.hideLoading) this.hideLoading("wait....");
									setTipeButton(tbSimpan);
									//cek KP06 = update CO
									var log = res.get("KP06");						
									if (log && log.get("ex_return") == "FAILED") {							
										if (log.get("msg") == undefined) this.showAlert(log, log.get("data"), log.get("proses"));
										else system.alert(this,log.get("msg"),"");
										return;
									}
									log = res.get("FM9C");						
									if (log &&  log.get("ex_return") == "FAILED") {											
										for (var i in log.objList) alert(i +":"+log.get(i));
										if (log.get("msg") == undefined) this.showAlert(log, log.get("data"), log.get("proses"));
										else system.alert(this,log.get("msg"),"");
										return;
									}			
								}
							}
						}
					}else var status = "SUCCESS";
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_app_m","no_app","FCKEP-"+this.e_periode.getText().substr(2,4)+".","0000"));
					if (status == 'SUCCESS') {
						var sql = new server_util_arrayList();
						sql.add("insert into rra_app_m(no_app, kode_lokasi,tanggal,keterangan,modul,periode,no_del,nik_buat,nik_app,nik_user,tgl_input,jenis_form) values " +
						"('" +
						this.e_nb.getText() +
						"','" +
						this.app._lokasi +
						"','" +
						this.dp_d1.getDateString() +
						"','" +
						this.e_ket.getText() +
						"','" +
						this.c_modul.getText() +
						"','" +
						this.e_periode.getText() +
						"','-','" +
						this.app._userLog +
						"','" +
						this.app._userLog +
						"','" +
						this.app._userLog +
						"',now(),'FCKEP')");
						var line;
						for (var i = 0; i < this.dataJU.rs.rows.length; i++) {
							line = this.dataJU.rs.rows[i];
							if (line.status.toUpperCase() == "APP") {
								sql.add("insert into rra_app_d(no_app,modul,no_bukti,kode_lokasi,sts_pdrk,catatan) values " +
								"('" +
								this.e_nb.getText() +
								"','" +
								this.c_modul.getText() +
								"','" +
								line.no_bukti +
								"','" +
								this.app._lokasi +
								"','" +
								line.jenis.toUpperCase() +
								"','" +
								line.no_dokumen +
								"')");
								var updateFlag = this.c_modul.getText() == "RRR" ? " flag_rfc = '1'":" flag_rfc = '2'";
								sql.add("update rra_pdrk_m set "+updateFlag+", progress='F2', nik_keep='"+this.app._userLog+"' where no_pdrk='" + line.no_dokumen + "' and kode_lokasi='" + this.app._lokasi + "'");
								if (line.jenis.toUpperCase() == "FREV"){ 
									sql.add("update rra_frev_m set "+updateFlag+" where no_frev='" + line.no_bukti + "' and kode_lokasi='" + this.app._lokasi + "'");								
									switch (this.c_modul.getText()){
										case "STB" :
											sql.add("update rra_rev_m set "+updateFlag+" where no_pdrk='" + line.no_dokumen + "' and kode_lokasi='" + this.app._lokasi + "'");
										break;
										case "OPN" :
											sql.add("update rra_grev_m set "+updateFlag+" where no_pdrk='" + line.no_dokumen + "' and kode_lokasi='" + this.app._lokasi + "'");
										break;
									}
								}
								if (line.jenis.toUpperCase() == "REV") 
									sql.add("update rra_rev_m set "+updateFlag+" where no_rev='" + line.no_bukti + "' and kode_lokasi='" + this.app._lokasi + "'");
								if (line.jenis.toUpperCase() == "GREV") 
									sql.add("update rra_grev_m set "+updateFlag+" where no_grev='" + line.no_bukti + "' and kode_lokasi='" + this.app._lokasi + "'");
								if (line.jenis.toUpperCase() == "MREV") 
									sql.add("update rra_mrev_m set flag_rfc='1' where no_mrev='" + line.no_bukti + "' and kode_lokasi='" + this.app._lokasi + "'");
							}
						}						
						this.dbLib.execArraySQL(sql);
					}else {
						if (this.hideLoading) this.hideLoading("wait....");
						system.alert(this,"Status :"+status,"");
						setTipeButton(tbSimpan);
					}
				}
				catch(e){
					if (this.hideLoading) this.hideLoading("wait....");
					setTipeButton(tbSimpan);
					system.alert(this, e,"");
				}
			}else if (this.hideLoading) this.hideLoading("wait....");
		}catch(e){
			if (this.hideLoading) this.hideLoading("wait....");
			setTipeButton(tbSimpan);
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.c_modul.setText("");
					this.sg.setTag("0");
					this.dataJU.rs.rows = [];
					this.sg.clear(1); this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
			
				var isAda = false;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					if (this.dataJU.rs.rows[i].status == "APP") isAda = true;
				}
				if (!isAda){
					system.alert(this,"Transaksi tidak valid.","Tidak ada transaksi dengan status APP.");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_app_m","no_app","FCKEP-"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
		}
		if (sender == this.i_postAll) {
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].status = "APP";
			}
			this.doTampilData(this.page);
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode) {
			this.dataJU.rs.rows = [];
			this.sg.clear(1); this.sg2.clear(1);
		}
		if (sender == this.c_modul || sender == this.c_jenis) {
			 {
				 /*"select 'INPROG' as status,a.no_pdrk as no_bukti,a.no_pdrk as no_dokumen,date_format(a.tanggal,'%d-%m-%Y') as tanggal,a.keterangan,'PDRK' as jenis "+
						 "from  rra_pdrk_m a "+
						 (this.app._statusLokasiUser == "FC" ? "" : "	inner join rra_finop_ubis cc on cc.kode_ubis = a.kode_ubis and cc.kode_lokasi = a.kode_lokasi and cc.kode_cc = '"+this.app._kodeCC+"' ")+
						 "where a.sts_pdrk='"+this.c_modul.getText()+"' and a.jenis_agg = '"+this.c_jenis.getText()+"' and "+addFilter+" and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+*/
				var addFilter = this.c_modul.getText() == "RRR" ? "a.flag_rfc = '0'": this.c_modul.getText() == "STB" ? "a.flag_rfc = '1' and a.progress = '3' " :"a.flag_rfc = '1' and a.progress = '3' ";
				
				var strSQL = "select 'INPROG' as status,a.no_rev as no_bukti,a.no_pdrk as no_dokumen,date_format(a.tanggal,'%d-%m-%Y') as tanggal,a.keterangan,'REV' as jenis "+
						 "from  rra_rev_m a "+
						 (this.app._statusLokasiUser == "FC" ? "" : "	inner join rra_finop_ubis cc on cc.kode_ubis = a.kode_ubis and cc.kode_lokasi = a.kode_lokasi and cc.kode_cc = '"+this.app._kodeCC+"' ")+
						 "where a.sts_pdrk='"+this.c_modul.getText()+"' and a.jenis_agg = '"+this.c_jenis.getText()+"' and "+addFilter+" and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and ((a.nik_keep = '"+this.app._userLog+"' and a.sts_pdrk = 'RRR')  ) "+
						 " union "+
						 "select 'INPROG' as status,a.no_frev as no_bukti,a.no_pdrk as no_dokumen,date_format(a.tanggal,'%d-%m-%Y') as tanggal,a.keterangan,'FREV' as jenis "+
						 "from  rra_frev_m a "+
						 (this.app._statusLokasiUser == "FC" ? "" : "	inner join rra_finop_ubis cc on cc.kode_ubis = a.kode_ubis and cc.kode_lokasi = a.kode_lokasi and cc.kode_cc = '"+this.app._kodeCC+"' ")+
						 "where a.sts_pdrk='"+this.c_modul.getText()+"' and a.jenis_agg = '"+this.c_jenis.getText()+"' and a.flag_rfc in ('-','1')  and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.sts_pdrk in ('STB','OPN')  "+
						 " union "+
						 "select 'INPROG' as status,a.no_grev as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan,'GREV' as jenis "+
						 "from rra_grev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi "+
						 "where a.sts_pdrk='"+this.c_modul.getText()+"' and a.jenis_agg = '"+this.c_jenis.getText()+"' and "+addFilter+" and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and ((a.nik_keep = '"+this.app._userLog+"' and a.sts_pdrk = 'RRR') ) "+
						 " union "+										 
						 "select 'INPROG' as status,a.no_mrev as no_bukti,a.no_pdrk as no_dokumen,date_format(b.tanggal,'%d-%m-%Y') as tanggal,b.keterangan,'MREV' as jenis "+
						 "from rra_mrev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi "+
						 "where a.sts_pdrk='"+this.c_modul.getText()+"' and a.jenis_agg = '"+this.c_jenis.getText()+"' and a.flag_rfc='0' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_keep = '"+this.app._userLog+"'  ";
				
				var data = this.dbLib.getDataProvider(strSQL,true);				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);
			}
		}
	},
	doTampilData: function(page) {
		this.sg.clear(); this.sg2.clear(1);
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.status.toUpperCase(),line.no_bukti,line.no_dokumen,line.tanggal,line.keterangan,line.jenis.toUpperCase()]);
		}
		this.sg.setNoUrut(start);
	},
	doChangeCells: function(sender, col , row) {
		if (col == 0) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].status = this.sg.cells(0,row);
		}
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(1,row) != "") {
			this.sg2.clear();
			var strSQL = "";
			switch(this.sg.cells(5,row)){
				case "PDRK" :
							strSQL = "select substring(a.periode,5,2) as bulan,a.kode_cc,b.nama as nama_cc,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai,case a.dc when 'D' then 'TERIMA' else 'DONOR' end as dc,a.target, a.nilai_keep "+
									 "from rra_pdrk_d a inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi "+
									 "				   inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
									 "				   left join rra_drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
									 "where a.no_pdrk = '"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc";
					break;				
				
				case "REV" :
							strSQL = "select substring(a.periode,5,2) as bulan,a.kode_cc,b.nama as nama_cc,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai,case a.dc when 'D' then 'TERIMA' else 'DONOR' end as dc,a.target, a.nilai_keep "+
									 "from rra_rev_d a inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi "+
									 "				   inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
									 "				   left join rra_drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
									 "where a.no_rev = '"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc";
					break;				
				case "FREV" :
							strSQL = "select substring(a.periode,5,2) as bulan,a.kode_cc,b.nama as nama_cc,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai,case a.dc when 'D' then 'TERIMA' else 'DONOR' end as dc,a.target, a.nilai_keep "+
									 "from rra_frev_d a inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi "+
									 "				   inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
									 "				   left join rra_drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
									 "where a.no_frev = '"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc";
					break;				
				
				case "GREV" :
							strSQL = "select substring(a.periode,5,2) as bulan,a.kode_cc,b.nama as nama_cc,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai,case a.dc when 'D' then 'TERIMA' else 'DONOR' end as dc,a.target, a.nilai_keep "+
									 "from rra_grev_d a inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi "+
									 "				   inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
									 "				   left join rra_drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
									 "where a.no_grev = '"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc";
					break;				
				case "MREV" :
							strSQL = "select substring(a.periode,5,2) as bulan,a.kode_cc,b.nama as nama_cc,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai,case a.dc when 'D' then 'TERIMA' else 'DONOR' end as dc,a.target, a.nilai_keep "+
									 "from rra_mrev_d a inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi "+
									 "				   inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
									 "				   left join rra_drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
									 "where a.no_mrev = '"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc";
					break;				
			}
			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.bulan,line.kode_cc,line.nama_cc,line.kode_drk,line.nama_drk,line.kode_akun,line.nama_akun,line.dc.toUpperCase(),floatToNilai(line.nilai),line.target,floatToNilai(line.nilai_keep)]);
				}
			} else this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[1]);
			try{
				this.filter = "where a.no_pdrk='"+this.sg.cells(2,row)+"'";
				this.showFilter = "";
				this.lokasi = "";
				this.filter2 = "";
				this.docPDRK1.src = this.report.previewWithHeader("server_report_rra_rptPdrk1",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
				this.docPDRK2.src = this.report.previewWithHeader("server_report_rra_rptPdrk2",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
				this.docPDRK3.src = this.report.previewWithHeader("server_report_rra_rptPdrk3",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
				//rpt1
				//rpt2
				//rpt3
			}catch(e){
				alert(e);
			}
		}
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    
						if (this.hideLoading) this.hideLoading("wait....");				
						setTipeButton(tbSimpan);
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});
