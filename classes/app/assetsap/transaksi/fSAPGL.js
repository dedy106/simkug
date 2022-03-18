/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fSAPGL = function(owner) {
	if (owner){
		try{
			window.app_assetsap_transaksi_fSAPGL.prototype.parent.constructor.call(this,owner);
			this.maximize();
			this.className  = "app_assetsap_transaksi_fSAPGL";		
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Compare SAP AM dgn GL", 0);	
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
			this.e_pwd = new saiLabelEdit(this,{bound:[700,2,200,20], caption:"SAP Password", password:true});
			this.cbKlp = new saiCBBL(this, {bound:[20,9,200,20], caption:"Class Aset", multiSelection:true, 
				sql:["select kode_klpfa, nama from amu_klp where kode_lokasi = '"+this.app._lokasi+"'",["kode_klpfa","nama"],false,["Kode","Deskripsi"],"and","Daftar Class Aset",true]
			});			
			this.bData = new button(this, {bound:[800,9,80,20], caption:"SAP AM", click:[this,"doClick"]});
			this.p1 = new panel(this, {
				bound: [20, 11, 900, 230],
				caption: "Data Aset"
			});
			this.eAcq = new saiLabelEdit(this,{bound:[20,0,200,20], caption:"Acq Value", readOnly : true, tipeText:ttNilai});						
			this.eAcq2 = new saiLabelEdit(this,{bound:[700,0,200,20], caption:"Acq Value(GL)", readOnly : true, tipeText:ttNilai});
			this.eAP = new saiLabelEdit(this,{bound:[20,1,200,20], caption:"Dep Value", readOnly : true, tipeText:ttNilai});
			this.eAP2 = new saiLabelEdit(this,{bound:[700,1,200,20], caption:"Dep Value(GL)", readOnly : true, tipeText:ttNilai});
			
			this.sgUpld = new saiGrid(this.p1, {
				bound: [1, 20, 898, 180],
				colCount: 12,
				colTitle: "APC, Deskripsi, NILAI AM, NILAI GL,Selisih, Penjelasan, AKUN DEP, Deskripsi, NILAI AM, NILAI GL, Selisih, Penjelasan ",
				colWidth: [[11,10,9,8,7,6,5,4, 3, 2, 1, 0], [200,100,100, 100, 250, 100, 200,100, 100, 100, 250,100]],
				readOnly: true,
				change: [this, "doGridChange"],
				rowCount: 1, rowPerpage : 20, autoPaging:true,
				colFormat: [[2,3,4,8,9,10],[cfNilai, cfNilai, cfNilai, cfNilai, cfNilai, cfNilai, cfNilai]],
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
window.app_assetsap_transaksi_fSAPGL.extend(window.childForm);
window.app_assetsap_transaksi_fSAPGL.implement({
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
						sql.add("delete from amu_glrekon where periode = '"+this.ed_Periode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");						
						for (var i=0; i < this.sgUpld.getRowCount(); i++){
							sql.add("insert into amu_glrekon(no_rekon, periode, kode_lokasi, kode_akun1, nilai_am, nilai_gl, selisih1, catatan1, kode_akun2, nilai_apam, nilai_apgl, selisih2, catatan2, nik_user,tgl_input )"+
								"values('"+this.ed_kode.getText()+"','"+this.ed_Periode.getText()+"', '"+this.app._lokasi+"', "+
								"'"+this.sgUpld.cells(0,i)+"','"+parseNilai(this.sgUpld.cells(2,i))+"', '"+parseNilai(this.sgUpld.cells(3,i))+"', '"+parseNilai(this.sgUpld.cells(4,i))+"', '"+this.sgUpld.cells(5,i)+"', "+
								"'"+this.sgUpld.cells(6,i)+"','"+parseNilai(this.sgUpld.cells(8,i))+"', '"+parseNilai(this.sgUpld.cells(9,i))+"', '"+parseNilai(this.sgUpld.cells(10,i))+"', '"+this.sgUpld.cells(11,i)+"' "+
								",'"+this.app._userLog+"', now())");
						}
						this.dbLib.execArraySQL(sql, undefined, this);
					}
				break;
				case "ubah" :
					
				break;
				case "delete" :
					
				break;
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectedDate: function(sender, y, m, d){
       this.ed_Periode.setText(sender.getThnBln());
    },
	doFindBtnClick: function(sender){		
	},
	doChange: function(sender){		
	},
	callRFC : function(dataSelection){
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
										 user : this.e_uid.getText(),//"700656"
										 passwd : this.e_pwd.getText()}//"sumadi99"
					} );
					//(this.dp_tgl.day < 10 ? "0":"")+this.dp_tgl.day+""+this.dp_tgl.getThnBln().substr(4,2)+""+this.dp_tgl.getThnBln().substr(0,4);			
		var tgl = this.dp_tgl.getThnBln()+""+(this.dp_tgl.day < 10 ? "0":"")+this.dp_tgl.day;			
		error_log("tanggal :"+tgl);
		error_log("class :"+classAset +":"+classAset2);
		this.sapImp = new server_util_Map({items: {
							IM_AFABE:"01", 
							//IM_ANLKL: this.cbKlp.getText() != "" ? "00"+classAset :"",
							IM_ANLKL_LOW: "00"+classAset,
							IM_ANLKL_HIGH : "00"+classAset2 ,
							IM_BRDATU:tgl,
							IM_BUKRS:"1000" }
							});
		this.sapExpTable = new server_util_arrayList({items:["T_COMPARE"]});//"T_ASSET_BLC",
		this.sapExp = "EX_RETURN";
		this.rfc.callRFC(this.login, "ZFMFI_COMPARE_GL_ASSET",this.sapImp, this.sapExpTable, undefined, undefined,  true);
	},
	doClick: function(sender){
		if (sender == this.bData)
		{		
			try{
				this.sgUpld.clear();
				this.dataCompare = new arrayMap();
				/*var dataFilter = this.cbKlp.dataFilter;
				if (dataFilter == undefined) {
					this.cbKlp.dataFilter = new arrayMap();
					this.cbKlp.dataFilter.set("=",["'"+this.cbKlp.getText()+"'"]);
					this.cbKlp.dataFilter.set("range",new arrayMap());
					this.cbKlp.dataFilter.set("like",new arrayMap());
					dataFilter = this.cbKlp.dataFilter;
				}
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
				}*/
				this.prosesId = 0;				
				this.dataSelection = this.cbKlp.dataSelection;
				if (this.dataSelection == undefined) {
					this.dataSelection = [];
					this.dataSelection = [{tipe:"range", value1:this.cbKlp.getText(), value2:this.cbKlp.getText()}];
				}				
				this.callRFC(this.dataSelection[this.prosesId]);//this.classFA[this.prosesId]
			}catch(e){
				alert(e);
				this.hideLoading();
			}
		}else this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_glrekon','no_rekon',"RK-"+this.ed_Periode.getText().substring(2)+"/",'0000'));
	},
	doRequestReady: function(sender, methodName, result, callbackObj){		
		error_log(result);
		if (sender == this.rfc){
			try{								
				if (result instanceof portalui_arrayMap){									
					var data = result.get("T_COMPARE");
					var line;
					if (this.prosesId == 0) {
						this.sgUpld.clear();
						this.dataCompare = new arrayMap();
					}
					var dtAP;					
					for (var i in data.objList){
						var rows = data.get(i);						
						for (var j in rows.objList){
							line = rows.get(j).getArray();								
							var AP = line.SUM_DEP.replace("-","");							
							AP = nilaiToFloat(AP) * (line.SUM_DEP.indexOf("-") > 0 ? -1 : 1);
							var gl2 = line.SUM_AP.replace("-","");
							gl2 = line.SUM_AP.split(".");
							gl2 = nilaiToFloat(gl2[0]) * (line.SUM_AP.indexOf("-") > 0 ? -1 : 1);							
							var gl1 = line.SUM_HP.split(".");
							gl1 = parseFloat(gl1[0]);											
							var akunAP = line.KTNAFB == "" ? "-" : line.KTNAFB;							
							var dt = this.dataCompare.get(line.KTANSW);								
							if ( dt == undefined){
								dt = {nilaiam : nilaiToFloat(line.SUM_ASSET) , nilaigl : gl1, selisih: nilaiToFloat(line.SUM_ASSET) - gl1}								
								dtAP = undefined;								
							}else {
								dt = { akunAP: dt.akunAP, dataAP: dt.dataAP, nilaiam : dt.nilaiam + nilaiToFloat(line.SUM_ASSET), nilaigl : gl1, selisih: (dt.nilaiam + nilaiToFloat(line.SUM_ASSET)) - gl1 }
								dtAP = dt.dataAP;
							}
							if (line.KTANSW == "0013101001"){
								AP = 0;
								gl2 = 0;
								akunAP = "-";
							}
							
							if ( dtAP == undefined){
								dtAP = {nilaiam : AP, nilaigl : gl2, selisih: AP - gl2};
							}else {
								dtAP = { nilaiam : dtAP.nilaiam + AP , nilaigl : gl2, selisih: dtAP.nilaiam + AP - gl2 };
							}								
							dt.akunAP = akunAP;
							dt.dataAP = dtAP;							
							this.dataCompare.set(line.KTANSW,dt);						
							//this.sgUpld.appendData([line.KTANSW,"-", line.SUM_ASSET,gl1,nilaiToFloat(line.SUM_ASSET) - gl1,"-", 
							//		akunAP,"-", AP, qty,AP - qty,"-"]);														
						}
					}							
					this.sgn.setTotalPage(this.sgUpld.getTotalPage());
					this.sgn.rearrange();							
										
					this.prosesId++;						
					this.sgUpld.clear();
					for (var i in this.dataCompare.objList){
						line = this.dataCompare.get(i);
						this.sgUpld.appendData([i,"-", line.nilaiam, line.nilaigl,line.selisih,"-", 
									line.akunAP,"-", line.dataAP.nilaiam, line.dataAP.nilaigl, line.dataAP.selisih,"-"]);	
					}
					
					//if (this.prosesId < this.classFA.length){
					//	this.callRFC(this.classFA[this.prosesId]);
					//}else 
					if (this.prosesId < this.dataSelection.length){
						this.callRFC(this.dataSelection[this.prosesId]);
					}else 
					{						
						this.prosesId = 0;						
						var total = {acq: 0, ap :0, bval : 0,acq2: 0, ap2 :0, bval2 : 0};
						for (var i=0; i < this.sgUpld.getRowCount(); i++ ){							
							total.acq += nilaiToFloat(this.sgUpld.cells(2,i));
							total.ap += nilaiToFloat(this.sgUpld.cells(8,i));							
							total.acq2 += nilaiToFloat(this.sgUpld.cells(3,i));
							total.ap2 += nilaiToFloat(this.sgUpld.cells(9,i));							
						}
						this.eAcq.setText(floatToNilai(total.acq));
						this.eAP.setText(floatToNilai(total.ap));						
						this.eAcq2.setText(floatToNilai(total.acq2));
						this.eAP2.setText(floatToNilai(total.ap2));						
						this.hideLoading();
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
	tampilGrid: function(result){
		var line;
		this.sgUpld.clear();
		for (var i in result.rows){
			line = result.rows[i];
			data = [line["asset"] + line["sno."]];			
			for (var c in line){	
				if (c != "cocd" && trim(c) != "asset class"){		
					if (c == "nilai" || c == "nilai_ap" || c == "nilai_buku" || trim(c) == "acquis.val." || trim(c) == "accum.dep." || trim(c) == "book val."){												
						data[data.length] = floatToNilai(parseFloat(line[c]));
					}else  
						data[data.length] = line[c] == "" ? "-" : line[c];					
				}				
			}
			this.sgUpld.appendData(data);			
		}
		this.sgUpld.setNoUrut(parseFloat(result.start));
	},
	doGridChange: function(sender, col, row,param1,result, data){	    
    },
	doUploadFinish: function(sender, result, data, filename){
		try{	
			if (result){			
				/*this.dataUpload= data;			
				this.sgn.setTotalPage(Math.ceil(data.rows.length / 50));
				this.sgn.rearrange();
				this.doLoadPage(1);		*/											
				this.svrUpload.setFile(filename,this.rootDir+"/"+sender.param2+urldecode(data));
				this.ed_nmFile.setText(filename);
			}else system.alert(this,"Error upload","");
		}catch(e){
			alert(e);
		}
	},
	doPager: function(sender,page){
		//this.doLoadPage(page);
		//this.svrUpload.getData(page);
		this.sgUpld.doSelectPage(page);
	},
	doLoadPage: function(page){
		var line;
		this.sgUpld.clear();
		var data,start = (page - 1) * 50;
		var finish = start + 50;
		if (finish > this.dataUpload.rows.length) 
			finish = this.dataUpload.rows.length;								
		var first = true;
		for (var i = start; i < finish; i++) {
			line = this.dataUpload.rows[i];
			data = [line["Asset"] + line["SNo."]];			
			for (var c in line){	
				if (c != "CoCd" && trim(c) != "Asset Class"){		
					if (c == "nilai" || c == "nilai_ap" || c == "nilai_buku" || trim(c) == "Acquis.val." || trim(c) == "Accum.dep." || trim(c) == "Book val."){												
						data[data.length] = floatToNilai(parseFloat(line[c]));
					}else  
						data[data.length] = line[c] == "" ? "-" : line[c];					
				}				
			}
			this.sgUpld.appendData(data);			
		}			
		this.start = start;
		this.sgUpld.setNoUrut(start);
	}
});
