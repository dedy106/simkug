/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fTransfer = function(owner) {
	if (owner){
		try{
			window.app_assetsap_transaksi_fTransfer.prototype.parent.constructor.call(this,owner);
			this.maximize();
			this.className  = "app_assetsap_transaksi_fTransfer";		
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Tansfer SAP AM", 0);	
			uses("util_rfcLib;datePicker;checkBox");			
			this.ed_Periode = new saiLabelEdit(this, {
				bound: [20, 0, 200, 20],
				caption: "Periode",
				change: [this, "doChange"],
				readOnly: true,
				tag: 2
			});			
			this.l_tgl = new label(this, {
				bound: [20, 1, 100, 20],
				caption: "Posting Date",
				underline: true
			});
			this.dp_tgl = new datePicker(this, {
				bound: [120, 1, 100, 18],
				selectDate: [this, "doSelectedDate"]
			});
			this.e_uid = new saiLabelEdit(this,{bound:[700,1,200,20], caption:"SAP User"});
			this.ed_kode = new saiLabelEdit(this, {
				bound: [20, 2, 200, 20],
				caption: "No Dokumen",
				readOnly: true
			});
			this.bGen = new button(this, {
				bound: [230, 2, 80, 20],
				caption: "Generate",
				click: "doClick"
			});										
			this.e_pwd = new saiLabelEdit(this,{bound:[700,2,200,20], caption:"SAP Password",password:true});
			this.cbKlp = new saiCBBL(this, {bound:[20,9,220,20], caption:"Class Aset", multiSelection:true, change:[this,"doEditChange"],
				sql:["select kode_klpfa, nama from amu_klp where kode_lokasi = '"+this.app._lokasi+"'",["kode_klpfa","nama"],false,["Kode","Deskripsi"],"and","Daftar Class Aset",true]
			});
			this.bLoad = new button(this, {bound:[700,9,80,20], caption:"Data Transfer", click:[this,"doClick"]});			
			this.bData = new button(this, {bound:[800,9,80,20], caption:"SAP AM", click:[this,"doClick"]});
			
			this.p1 = new panel(this, {
				bound: [20, 11, 900, 230],
				caption: "Data Aset"
			});
			this.eAcq = new saiLabelEdit(this,{bound:[20,0,300,20], caption:"Acq Value", readOnly : true, tipeText:ttNilai});
			this.eAP = new saiLabelEdit(this,{bound:[20,1,300,20], caption:"Dep Value", readOnly : true, tipeText:ttNilai});
			this.eBook = new saiLabelEdit(this,{bound:[20,2,300,20], caption:"Book Value", readOnly : true, tipeText:ttNilai});
			this.sgUpld = new saiGrid(this.p1, {
				bound: [1, 20, 898, 180],
				colCount: 15,
				colTitle: "No Gabung, NKA, SN, Deskripsi, Deskrips2, Akun Aset, Klp. Aset, BA, Plant, Lokasi, Tgl Perolehan, Nilai Perolehan, Nilai Akumulasi, Nilai Buku, Jml Fisik ",
				colWidth: [[14,13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [100,100, 100, 100, 80, 80, 80, 50, 80, 80, 150, 150, 50, 100, 100]],
				readOnly: true,
				change: [this, "doGridChange"],
				rowCount: 1, rowPerpage : 20, autoPaging:true,
				colFormat: [[14,13,12,11],[cfNilai, cfNilai, cfNilai, cfNilai]],
				tag: 9
			});		
			this.sgn = new sgNavigator(this.p1, {
				bound: [1, this.p1.height - 25, 898, 25],
				buttonStyle: 3,
				grid: this.sgUpld,
				pager:[this,"doPager"]
			});
			this.rearrangeChild(10,23);			
			this.setTabChildIndex();
			this.dbLib = this.app.dbLib;
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			setTipeButton(tbSimpan);
			this.filter = "";
			this.ed_Periode.setText(this.dp_tgl.getThnBln());
			this.rfc = new util_rfcLib(this.app._rfcSetting);
			this.rfc.addListener(this);
			this.onClose.set(this,"doClose");						
			var data = this.dbLib.getDataProvider("select value1, value2 from spro where modul = 'KLPFA' and kode_lokasi = '"+this.app._lokasi+"'",true);
			if (typeof data != "string"){
				var dtSelection = [];
				for (var i in data.rs.rows){
					var line = data.rs.rows[i];
					dtSelection[i] = {tipe:"Range", value1:line.value1, value2:line.value2};
				}
				this.cbKlp.dataSelection = dtSelection;
			}
			
		}catch(e){
			alert(e);
		}
	}
};
window.app_assetsap_transaksi_fTransfer.extend(window.childForm);
window.app_assetsap_transaksi_fTransfer.implement({
	doClose: function(sender){	
		this.rfc.deinit();			
		this.dbLib.delListener(this);
	},
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
	doModalResult: function(event, result){				
		try{
			if (result != mrOk) return;
			var sql = new server_util_arrayList();			
			switch(event){
				case "clear" :
					if (result == mrOk){
						this.standarLib.clearByTag(this, new Array("0","1","9"),this.ed_kode);		
						this.sgUpld.clear(1);
					}
				break;
				case "simpan" :
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){
						this.doClick();					
						sql.add("insert into amu_load_m (no_load, tanggal, keterangan, namafile, kode_lokasi, tgl_input, nik_user, periode)"+
							" values('"+this.ed_kode.getText()+"','"+this.dp_tgl.getDateString()+"', '-', '-','"+this.app._lokasi+"', now(),'"+this.app._userLog+"','"+this.app._periode+"'  )");
						var line;
						if (this.filter == "")
							sql.add("delete from amu_asset where periode = '"+this.ed_Periode.getText()+"' ");
						else sql.add("delete from amu_asset "+this.filter+" and periode = '"+this.ed_Periode.getText()+"' ");
						/*for (var i=0; i < this.sgUpld.getRowCount(); i++ ){																					
							data = ["'"+this.ed_kode.getText()+"'","'"+this.ed_Periode.getText()+"'","'"+this.app._lokasi+"'"];
							for (var c=0; c < this.sgUpld.getColCount();c++){
								if (c > 10)
									if (trim(this.sgUpld.cells(c,i)) == "")
										data.push("0");
									else
										data.push(parseNilai(trim(this.sgUpld.cells(c,i))));
								else if (c == 10){
									data.push("to_date('"+this.sgUpld.cells(c,i)+"','yyyy/mm/dd')");
								}else {
									var str = this.sgUpld.cells(c,i);
									if (typeof str == "string") str = str.replace(/'/gi,"''");
									data.push("'"+str+"'");
								}
							}
							data.push("'"+this.sgUpld.cells(7,i)+"'");
							if (trim(data[data.length-1]) == "") {
								data[data.length-1] = 0;
							}							
							sql.add("insert into amu_asset (no_upload,periode, kode_lokasi,no_gabung,no_fa, no_sn,  nama, nama2,kode_klpakun, kode_klpfa, kode_lokfa, ref1, ref2,  tgl_perolehan, nilai, nilai_ap, nilai_buku,jml_fisik, kode_lokfa2 )values("+ data+")");
							//sql.add("insert into amu_load_d (no_load, kode_lokasi, no_gabung,no_fa, no_sn,  nama, nama2,kode_klpakun, kode_klpfa, kode_lokfa, ref1, ref2,  tgl_perolehan, nilai, nilai_ap, nilai_buku,jml_fisik )values("+ data+")");							
						}*/
						sql.add("insert into amu_asset(no_upload,periode, kode_lokasi,no_gabung,no_fa, no_sn,  nama, nama2,kode_klpakun, kode_klpfa, kode_lokfa, ref1, ref2,  tgl_perolehan, nilai, nilai_ap, nilai_buku,jml_fisik, kode_lokfa2, kode_loksto, kode_regional) "+
							" select '"+this.ed_kode.getText()+"','"+this.ed_Periode.getText()+"', '"+this.app._lokasi+"',concat(no_fa, TO_NUMBER(no_sn)),no_fa, no_sn,  nama, nama2,kode_klpakun, substr(kode_klpfa,3,6), kode_lokfa, ref1, ref2,  tgl_perolehan, nilai, nilai_ap, nilai_buku,jml_fisik, kode_lokfa2, ref1, ref2 from amu_asset_temp");
						this.dbLib.execArraySQL(sql, undefined, this);						
					}
				break;
				case "ubah" :
					
				break;
				case "delete" :
					
				break;
			}			
		}catch(e){
			system.alert(this,e,i +":"+c +":"+this.sgUpld.cells(i,c));
		}
	},
	doSelectedDate: function(sender, y, m, d){
       this.ed_Periode.setText(sender.getThnBln());
    },
	doFindBtnClick: function(sender){		
	},
	doChange: function(sender){		
	},
	// sebelumnya classAset aja
	callRFC : function(dataSelection){
		try{
			var classAset = "";
			var classAset2 = "";			
			if (dataSelection.tipe.toLowerCase() == "range"){
				classAset = dataSelection.value1;
				classAset2 = dataSelection.value2;
			}
			if (dataSelection.tipe == "=" ){
				classAset = dataSelection.value1;
				classAset2 = dataSelection.value1;
			}
			this.showLoading("Prosessing ClassAset "+classAset+" - "+classAset2);
			this.login = new server_util_Map({items:{
						user : this.e_uid.getText(),//"630319"
						passwd : this.e_pwd.getText() }//"masagus9263"
						} );
			var tgl = this.dp_tgl.getThnBln()+""+(this.dp_tgl.day < 10 ? "0":"")+this.dp_tgl.day;								
			this.sapImp = new server_util_Map({items: {
								IM_AFABE:"01", 
								//IM_ANLKL: this.cbKlp.getText() != "" ? "00"+classAset :"",
								IM_ANLKL_LOW: "00"+classAset ,
								IM_ANLKL_HIGH : "00"+classAset2 ,
								IM_BRDATU: tgl,
								IM_BUKRS:"1000" }
								});
			this.sapExpTable = new server_util_arrayList({items:["T_ASSET_BLC"]});
			//this.sapExpTable = new server_util_arrayList({items:{ "T_ASSET_BLC" : new server_util_Map()}});
			this.sapExp = "EX_RETURN";			
			//login, sapFunc, sapImp, sapTable, sapExp, closeRfc, bufferKey, table, fields, dbsetting, rfcFields
			this.rfc.callRFCBuffer(this.login, "ZFMFI_ASSET_BALANCES",this.sapImp, this.sapExpTable, undefined,  true,
				"ANLN1_2",
				"amu_asset_temp",
				"no_fa,no_sn,nama,nama2,kode_klpakun,kode_klpfa,kode_lokfa,ref1,ref2,tgl_perolehan, nilai, nilai_ap, nilai_buku,jml_fisik, kode_lokfa2",
				this.app._dbSetting, 
				"ANLN1,ANLN2,TXT50,TXA50,KTANSW,ANLKL,GSBER,STORT,WERKS,AKTIV,ACC_VAL,ACM_DEP,BOOK_VAL,MENGE,GSBER");
		}catch(e){
			this.hideLoading();
			systemAPI.alert(e);
		}
	},
	doClick: function(sender){
		try{
			if (sender == this.bLoad){
				var data = this.dbLib.getDataProvider("select count(*) as tot, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku  from amu_asset_temp ", true);
				if (typeof data == "string"){
					throw (data);					
				}else {
					this.eAcq.setText(floatToNilai(data.rs.rows[0].nilai));
					this.eAP.setText(floatToNilai(data.rs.rows[0].nilai_ap));
					this.eBook.setText(floatToNilai(data.rs.rows[0].nilai_buku));
					//error_log(parseFloat(data.rs.rows[0].tot)+":"+data.rs.rows[0].tot);
					this.sgn.setTotalPage(Math.ceil(parseFloat(data.rs.rows[0].tot) / 20));
					this.sgn.rearrange();
				}
				var data = this.dbLib.getDataProviderPage("select no_gabung, no_fa, no_sn, nama,nama2, kode_klpakun, kode_klpfa,kode_lokfa, ref1, ref2, date_format(tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, nilai, nilai_ap, nilai_buku from amu_asset_temp ",1, 20,false);
				eval("data = "+data+";");
				if (typeof data == "string"){
					throw (data);
				}
				this.tampilGrid(data, 1);
				
				
				return;
			}
			if (sender == this.bData)
			{							
				/*var dataFilter = this.cbKlp.dataFilter;
				if (dataFilter == undefined) {
					this.cbKlp.dataFilter = new arrayMap();
					this.cbKlp.dataFilter.set("=",["'"+this.cbKlp.getText()+"'"]);
					this.cbKlp.dataFilter.set("range",new arrayMap());
					this.cbKlp.dataFilter.set("like",new arrayMap());
					dataFilter = this.cbKlp.dataFilter;
				}*/
				//range				
				this.dataSelection = this.cbKlp.dataSelection;
				if (this.dataSelection == undefined) {
					this.dataSelection = [];
					this.dataSelection = [{tipe:"range", value1:this.cbKlp.getText(), value2:this.cbKlp.getText()}];
				}
				var filter = "";
				for (var i in this.dataSelection){
					if (filter == "") filter += " where ";
					else if (filter != "") filter += " or ";
					filter += " (kode_klpfa between '00"+parseFloat(this.dataSelection[i].value1)+"' and '00"+parseFloat(this.dataSelection[i].value2)+"')";
				}				
				this.dbLib.execQuerySync("delete from amu_asset_temp "+filter);				
				this.prosesId = 0;
				/*
				var filter = "";
				if (dataFilter.get("=").length != 0){
					 var equal = dataFilter.get("=");
					 for (var i in equal){
						if (filter != "") filter  += " and ";
						filter = " kode_klpfa = "+equal[i];
					}
				}
				if (dataFilter.get("range").getLength() != 0){
					var range = dataFilter.get("range");
					for (var i in range.objList){
						if (filter != "") filter  += " and ";
						filter += " kode_klpfa "+ range.get(i);
					}
				}
				if (dataFilter.get("like").getLength() != 0){
					var like = dataFilter.get("like");
					for (var i in like.objList){
						if (filter != "") filter  += " and ";
						filter += " kode_klpfa "+ like.get(i);
					}
				}
				if (filter != "") filter = " where "+ filter;			
				this.filter = filter;
				var dataClass = this.dbLib.getDataProvider("select distinct kode_klpfa from amu_klp "+filter,true);
				this.classFA = [];
				if (dataClass){
					for (var i in dataClass.rs.rows){
						line = dataClass.rs.rows[i];
						this.classFA.push(line.kode_klpfa);
					}
					this.prosesId = 0;
				}
				*/				
				this.callRFC(this.dataSelection[this.prosesId]);//this.classFA[this.prosesId]
			}else this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_load_m','no_load',"LD/"+this.ed_Periode.getText().substring(2)+"/",'0000'));
		}catch(e){
			systemAPI.alert(e);
			this.hideLoading();
		}
	},

	doRequestReady: function(sender, methodName, result, callbackObj){				
		if (sender == this.rfc){
			try{				
				if (result instanceof portalui_arrayMap){									
					var data = result.get("T_ASSET_BLC");
					var line;
					if (this.prosesId == 0){
						 this.sgUpld.clear();
						 this.total = {acq : 0, ap:0, bval:0};
					}
					
					//[BUKRS,ANLKL,ANLN1,ANLN2,ANLN1_2,KTANSW,GSBER,WAERS,ACC_VAL,ACM_DEP,BOOK_VAL,AKTIV,TXT50,TXA50,MENGE, MEINS, STORT, WERKS, KOSTL, BTR1, BTR2 ]
					for (var i in data.objList){
						var rows = data.get(i);
						for (var j in rows.objList){
							line = rows.get(j).getArray();	
							
							var AP = line.ACM_DEP.replace("-","");
							AP = nilaiToFloat(AP) * (line.ACM_DEP.indexOf("-") > 0 ? -1 : 1);
							var qty = line.MENGE.split(".");
							qty = parseFloat(qty[0]);		
							if (trim(qty) == "") qty = "0";
							var tgl = line.AKTIV.substr(0,4)+"/"+line.AKTIV.substr(4,2)+"/"+line.AKTIV.substr(6,2);
							this.sgUpld.appendData([line.ANLN1 +""+parseFloat(line.ANLN2), line.ANLN1, parseFloat(line.ANLN2), line.TXT50, line.TXA50 == "" ?"-":line.TXA50, line.KTANSW, line.ANLKL.substr(2), line.GSBER, (line.STORT == "" ? "-":line.STORT), line.WERKS == "" ? "-":line.WERKS, 
								tgl, line.ACC_VAL, floatToNilai(AP), line.BOOK_VAL, qty]);
						}
					}							
					this.sgn.setTotalPage(this.sgUpld.getTotalPage());
					this.sgn.rearrange();		
					
					this.prosesId++;
					//if (this.prosesId < this.classFA.length){
					//	this.callRFC(this.classFA[this.prosesId]);
					if (this.prosesId < this.dataSelection.length){
						this.callRFC(this.dataSelection[this.prosesId]);
					}else 
					{
						
						/*var total = {acq: 0, ap :0, bval : 0};
						for (var i=0; i < this.sgUpld.getRowCount(); i++ ){							
							total.acq += nilaiToFloat(this.sgUpld.cells(11,i));
							total.ap += nilaiToFloat(this.sgUpld.cells(12,i));
							total.bval += nilaiToFloat(this.sgUpld.cells(13,i));
						}*/
						//insert ke table temporary
						//No Gabung, NKA, SN, Deskripsi, Deskrips2, Akun Aset, Klp. Aset, BA, Plant, Lokasi, Tgl Perolehan, Nilai Perolehan, Nilai Akumulasi, Nilai Buku
						var data = this.dbLib.getDataProvider("select count(*) as tot,sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku  from amu_asset_temp ", true);
						if (typeof data == "string"){
							throw (data);
						}
						this.eAcq.setText(floatToNilai(data.rs.rows[0].nilai));
						this.eAP.setText(floatToNilai(data.rs.rows[0].nilai_ap));
						this.eBook.setText(floatToNilai(data.rs.rows[0].nilai_buku));
						this.sgn.setTotalPage(Math.ceil(parseFloat(data.rs.rows[0].tot) / 20));
						this.sgn.rearrange();
						var data = this.dbLib.getDataProviderPage("select no_gabung, no_fa, no_sn, nama,nama2, kode_klpakun, kode_klpfa,kode_lokfa, ref1, ref2, date_format(tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, nilai, nilai_ap, nilai_buku from amu_asset_temp  ",1,20,true);
						if (typeof data == "string"){
							throw (data);
						}
						this.tampilGrid(data);
						this.hideLoading();
						this.prosesId = 0;
					}
					
				}else throw (result);
			}catch(e){				
				system.alert(this, e,"");
				this.hideLoading();
			}
		}
		if (sender == this.dbLib && this == callbackObj)
		{
			try
			{   				
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{							
							system.info(this,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")","");
						}else system.info(this,result,"");
	    			break;
	    		}
			}
			catch(e)
			{
				systemAPI.alert("error = "+e,result);
			}
		}else if (sender == this.fileUtil){	        
        }
        try{
			if (sender == this.svrUpload){			
				switch (methodName){
					case "setFile":
						result = JSON.parse(result);
						this.sgn.setTotalPage(Math.ceil(result.recCount / 20));
						this.sgn.rearrange();
						this.tampilGrid(result);
					break;
					case "getData":						
						result = JSON.parse(result);
						this.tampilGrid(result);
					break;				
					case "upload":
						if (result.toLowerCase().search("error") == -1)					
						{							
							system.info(this,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")","");
						}else system.info(this,result,"");
					break;
				}
			}
		}catch(e){
			alert(e+" "+result);
		}
	},	
	tampilGrid: function(data,page){
		this.sgUpld.clear();
		var line;
		for (var i in data.rs.rows){
			line = data.rs.rows[i];
			this.sgUpld.appendData([line.no_gabung, line.no_fa, line.no_sn, line.nama, line.nama2, line.kode_klpakun, line.kode_klpfa, line.kode_lokfa, line.ref1, line.ref2, line.tgl_perolehan , floatToNilai(line.nilai), floatToNilai(line.nilai_ap), floatToNilai(line.nilai_buku)]);
		}
		this.sgUpld.setNoUrut(page);
	},
	doGridChange: function(sender, col, row,param1,result, data){	    
    },	
	doPager: function(sender,page){
		//this.doLoadPage(page);
		//this.svrUpload.getData(page);
		//this.sgUpld.doSelectPage(page);
		var data = this.dbLib.getDataProviderPage("select no_gabung, no_fa, no_sn, nama,nama2, kode_klpakun, kode_klpfa,kode_lokfa, ref1, ref2, date_format(tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, nilai, nilai_ap, nilai_buku from amu_asset_temp ",page, 20,true);
		if (typeof data == "string"){
			throw (data);
		}
		this.tampilGrid(data, page);
	},
	
	doEditChange : function(sender){				
	}
});
