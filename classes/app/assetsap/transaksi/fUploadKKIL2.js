/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fUploadKKIL2 = function(owner) {
	if (owner){
		window.app_assetsap_transaksi_fUploadKKIL2.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_transaksi_fUploadKKIL2";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Inventarisasi Non Tanah Bangunan(Upload Batch File)", 0);	
		uses("saiMemo;util_file;datePicker;uploader;checkBox;app_assetsap_transaksi_fSvrUpload");								
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});						
		this.ed_jenis = new saiLabelEdit(this,{bound:[20,10,150,20], caption:"Jenis",text:"NTB", readOnly:true, items:["TB","NTB"], change:[this,"doChange"]});
		this.ed_lokfa = new saiCBBL(this, {
			bound: [20, 30, 150, 20],
			caption: "Bus. Area",
			multiSelection: false,
			text:this.app._kodeLokfa,
			rightLabel:this.app._namaLokfa,						
			sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' and  kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' ", ["kode_lokfa","nama"],false, ["Lokasi","Nama Lokasi"],"and","Data Area Bisnis",true],
			change:[this,"doChange"]		
		});
		this.ed_kode = new saiLabelEdit(this,{bound:[20,2,220,20],caption:"No Inventarisasi",readOnly:true});
		this.bGen = new button(this,{bound:[250,2,60,20],caption:"Generate",click:"doClick"});				
		this.ed_area = new saiLabelEdit(this,{bound:[20,4,220,20],caption:"Lokasi Aset(Area)"});
		this.ed_nik1 = new saiCBBL(this, {
			bound: [20, 3, 200, 20],
			caption: "Pembuat",
			multiSelection: false,
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
		});		
		this.cbUpload = new checkBox(this,{bound:[830,3,80,20], caption:"Upload Ulang"});
		this.ed_file = new saiLabelEdit(this, {bound:[20,6,400,20], caption:"Attachment KKIL"});
		this.upl_1 = new uploader(this,{bound:[430,6,80,20], param3: "object", param2 :"server/tmp/", param1 : "uploadTo",
				autoSubmit:true, afterUpload: [this, "doUploadFinish"], caption:"Browse"});
		this.upl_2 = new uploader(this,{bound:[830,6,80,20], param3: "object", param2 :"server/tmp/", param1 : "uploadTo",
				autoSubmit:true, afterUpload: [this, "doUploadFinish"], caption:"Upload KKIL"});
		this.bDownload = new button(this,{bound:[730,6,80,20],caption:"Download", click:[this,"doDownload"],hint:"Download format upload KKIL"});
		this.p1 = new panel(this,{bound:[20,11,900,230],caption:"Data Asset"});
		this.sg = new saiGrid(this.p1, {
			bound: [1, 20, 898, 180],
			colCount: 9,
			colTitle: ["No Kartu","Sub No.","No.Dist. KKIL","Alamat Aset","Jumlah Fisik","No. Label", "Status","Update Deskripsi & Lokasi", "Keterangan"],
			colWidth: [[8,7,6,5, 4, 3, 2, 1, 0], [250,250,80, 100,100,150,120,50,120]],
			readOnly: true,
			change: [this, "doGridChange"],
			rowCount: 1,
			tag: 9,
			//buttonStyle:[[3],[bsEllips]],
			//ellipsClick: [this,"doEllipsClick"],
			colFormat:[[1],[cfNilai]]
		});
		this.sgn = new sgNavigator(this.p1,{bound:[1,this.p1.height - 25,898,25],buttonStyle:bsTransNav, grid:this.sg, pager:[this,"doPager"]});
		this.rearrangeChild(10,23);
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);
					
		this.onClose.set(this,"doClose");
		this.doChange(this.ed_lokfa);		
		this.svrUpload = new app_assetsap_transaksi_fSvrUpload();
		this.svrUpload.addListener(this);				
		this.dbLib.getDataProviderA("select kode_status,nama from amu_status where jenis = 'TB' ");
        this.fileUtil = new util_file();
        this.fileUtil.addListener(this);
        //this.fileUtil.getRootDirA();	
        this.rootDir = this.app._rootDir;        
	}
};
window.app_assetsap_transaksi_fUploadKKIL2.extend(window.childForm);
window.app_assetsap_transaksi_fUploadKKIL2.implement({
	doClose: function(sender){				
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
						this.sg.clear(1);
						this.ed_jenis.setText("NTB");
					}
				break;
				case "simpan" :
					this.doClick();					
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){					
						this.svrUpload.uploadKKIL(this.ed_kode.getText(), this.app._periode, this.dp_tgl.getDateString(), this.ed_jenis.getText(), this.app._lokasi, this.ed_lokfa.getText(), this.app._userLog,this.ed_nik1.getText(), this.filename, this.ed_area.getText(), this.cbUpload.selected);
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
    },
	doFindBtnClick: function(sender){
				
	},
	doChange: function(sender){
		try{
			if (sender == this.ed_lokfa){
				this.sg.clear(1);							
				this.ed_nik1.clear();							
				this.ed_nik1.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and  kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);				
			}			
			if (sender == this.ed_jenis){		
				this.sg.clear();
				this.sg.setColCount(10);
				this.sg.setColTitle(["No Kartu","Sub No.","No.Dist. KKIL","Alamat Aset","Jumlah Fisik","No. Label", "Status","Ket. Status", "Update Deskripsi & Lokasi", "Keterangan"]);
				this.sg.setColWidth([9,8,7,6,5, 4, 3, 2, 1, 0], [250,250, 150,80, 100,100,150,120,50,120]);				
				this.sg.clear(1);
			}
		}catch(e){
			alert(e);
		}
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_kkl_m','no_inv',"INV."+this.ed_lokfa.getText()+"."+this.dp_tgl.getYear()+".",'000000'));
	},
	doRequestReady: function(sender, methodName, result){		
		if (sender == this.dbLib)
		{
			try
			{   				
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{							
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
							this.app._mainForm.bClear.click();                            
						}else system.info(this,result,"");
	    			break;
	    			case "getDataProvider":
						eval("result = "+result+";");
						this.dataStatus = new arrayMap();
						for (var i in result.rs.rows){
							this.dataStatus.set(result.rs.rows[i].kode_status, result.rs.rows[i].nama);
						}
	    			break;
	    		}
			}
			catch(e)
			{
				systemAPI.alert("error = "+e,result);
			}
		}else if (sender == this.fileUtil){
			if (methodName == "getRootDir"){
				this.rootDir = result;			
				this.separator = "/";
				this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);				
			}
        }else if (sender == this.svrUpload){				
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
					case "checkBusA":												
						if (result.getLength() > 0){
							system.alert(this, "Ada data upload yg beda dengan Bus. Area "+this.ed_lokfa.getText(),"Data ba yg salah");
						}
					break;				
					case "uploadKKIL":
						if (result.toLowerCase().search("error") == -1)
						{							
							system.info(this,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")",result);
						}else system.info(this,result,"");
					break;
				}
			}
	},	
	doGridChange: function(sender, col, row,param1,result, data){	
		if (col == 2){
			for (var i=0; i < this.sg.getRowCount();i++){
				if (this.sg.cells(2,i) == this.sg.cells(2,row) && i != row) {
					systemAPI.alert("No Label "+this.sg.cells(2,row)+" sudah dimasukkan di baris ke "+i);					
					break;
				}
			}
		}    
		if (col == 3){
			var column = this.sg.columns.get(col);
			if (column){
				if (column.buttonStyle == bsEllips){					
					this.sg.cells(4,row, this.dataStatus.get(this.sg.cells(3,row)));
				}
			}
		}		
    },
	doEllipsClick:function(sender, col ,row){		
			switch(col)
			{
				case 3 : 
					this.standarLib.showListDataForSG(this, "Daftar Status Aset",this.sg, this.sg.row, this.sg.col, 
													  "select kode_status, nama from amu_status where jenis= 'TB'",
													  "select count(kode_status)  from amu_status where jenis= 'TB' ",
													  ["kode_status","nama"],"where",["Kode Status","Nama"],false);
					break;				
			}	
	},
	doUploadFinish: function(sender, result, data, filename){
		try{	
			if (sender == this.upl_2){
				if (result){							
					this.svrUpload.setFile(filename,this.rootDir+"/"+sender.param2+urldecode(data));					
				}else system.alert(this,"Error upload","");
			}
			if (sender == this.upl_1){
				this.ed_file.setText(filename);
				this.filename = filename +";"+urldecode(data);				
			}
		}catch(e){
			alert(e);
		}
	},
	doPager: function(sender, page){
		this.svrUpload.getData(page);
	},
	tampilGrid: function(result){
		var line;
	
		this.sg.clear();
		var nka = [], data = [];
		for (var i in result.rows){
			line  = result.rows[i];	
			data = [];
			//data[data.length] = line["no kartu"] || line["no_fa"];
			//data[data.length] = line["sn"] || line["no_sn"];			
			for (var c in line){
				//if (c.search("nomor") > -1 || c == "no_bukti" || c == "no bukti") data[data.length] = line[c];
				//else  //if (c !="no kartu" && c != "sn" && c.search("nomor") == -1 && c != "no_bukti" && c != "no bukti"){
					data[data.length] = line[c] == "" ? "-" : line[c];					
				//}				
			}			
			this.sg.appendData(data);			
			nka[nka.length] = "'" +data[0] +"'";
		}				
		this.sg.setNoUrut(parseFloat(result.start));
		var data = this.dbLib.getDataProvider("select a.no_fa, a.no_sn, a.nama, a.nama2 from amu_asset a "+
				"inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'FISIK') b on b.kode_klpfa = a.kode_klpfa "+				
				"where a.no_gabung in ("+nka+") ",true) ;
		if (data.rs.rows.length > 0){
			
		}
	},
	doDownload: function(sender){
		downloadFile(this.fileUtil.getFileContents( this.rootDir+"/docs/template/ntb.xls"));
	}
});
