window.app_hrmis_gaji_transaksi_fUploadPot = function(owner)
{
	if (owner)
	{
		window.app_hrmis_gaji_transaksi_fUploadPot.prototype.parent.constructor.call(this, owner);
		this.className = "app_hrmis_gaji_transaksi_fUploadPot";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Upload Potongan", 0);	
		
		this.maximize();		
		uses("portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar");
		this.ed_lokasi = new portalui_saiCBBL(this,{bound:[20,9,185,20],caption:"Lokasi",text:this.app._lokasi,rightLabelCaption:this.app._namalokasi,btnVisible:false,readOnly:true});
		this.ed_period = new portalui_saiLabelEdit(this,{bound:[20,10,182,20],caption:"Periode",readOnly:true});		
		this.lblTgl1 = new portalui_label(this,{bound:[20,32,101,18],caption:"Tanggal",underline:true});						
		this.dp_tgl1 = new portalui_datePicker(this,{bound:[120,32,82,18], selectDate:[this,"doSelectDate"]});		
		this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,78,230,20],caption:"No Bukti", readOnly:true});					
		this.bGen = new portalui_button(this,{bound:[256,78,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)",click:[this,"doClick"]});		   		
		this.ed_ket = new portalui_saiLabelEdit(this,{bound:[20,122,500,20],caption:"Keterangan",maxLength:150});						
		this.bLoad = new portalui_button(this,{bound:[800,122,100,20],caption:"Load Semua",click:[this,"doClick"]});
		this.cb_setuju = new portalui_saiCBBL(this,{bound:[20,188,185, 20],caption:"Dibuat",readOnly:true,btnClick:[this,"doFindBtnClick"]});						
		this.bUpload = new portalui_uploader(this,{bound:[800,188,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		uses("portalui_saiGrid;portalui_sgNavigator");
		this.p1 = new portalui_panel(this,{bound:[20,189,900,260],caption:"Data Upload"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,900,200],colCount:6,
				colTitle:["NIK","Nama","Lembur","Tunj. Khusus","Rapel","K.Beban Kerj"],readOnly:true,
				colFormat:[[2,3,4,5],[cfNilai, cfNilai,cfNilai,cfNilai]], colWidth:[[0,1,2,3,4,5],[100,200,100,100,100,100]]});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,235,900,25],buttonStyle:1, grid:this.sg1, afterUpload:[this,"doAfterUpload"]});		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 30,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		setTipeButton(tbSimpan);		
		this.initColumn();
	}
};
window.app_hrmis_gaji_transaksi_fUploadPot.extend(window.portalui_childForm);
window.app_hrmis_gaji_transaksi_fUploadPot.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   
    		this.sg1.clear();
    		this.sg1.showLoading();
    		var line,lineData = [], first = true;	
            var isFileColumnValid = false;			
    		for (var i in data.rows){
    			line = data.rows[i];
    			lineData = [], lineTitle = [];
    			for (var c in line) {
    				if (c.toLowerCase() != "nik" && c.toLowerCase() != "nama" ){
    					var value = line[c];
    					value = value.replace(/,/gi,"");					
    					lineData.push(floatToNilai(parseFloat(value)));
    				}else
    					lineData.push(line[c]);
    				lineTitle.push(c);
    			}       
    			var sgData = [];    			    			
    			for (var c in this.colTitle){	    			
                    sgData[c] = "0";                    
                    for (var ld in lineTitle){               
    			         if (trim(lineTitle[ld]).toLowerCase() == trim(this.colTitle[c]).toLowerCase()){
    			             sgData[c] = lineData[ld];
    			             isFileColumnValid = true;                            
			             }
                     }                     
                }     
                if (first){                            
                    for (var ld in lineTitle){               
                        var isFileColumnValid = false;
                        for (var c in this.colTitle){	    
                            if (trim(lineTitle[ld]).toLowerCase() == trim(this.colTitle[c]).toLowerCase()){
    			                 isFileColumnValid = true;                            
			                 }
                        }
                        if (!isFileColumnValid) throw "Kolom ("+lineTitle[ld]+") di file tidak ada di data Parameter";             
                    }                                        
                }
                first = false;
    			this.sg1.appendData(sgData);
    		}				
    		this.sg1.hideLoading();		
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(); this.sg1.appendRow(); 
				}
				break;
			case "simpan" :
					try{
						uses("server_util_arrayList");
						var sql = new server_util_arrayList();
						sql.add("delete from gaji_load_pot_d where kode_lokasi = '"+this.app._lokasi+"' and periode = '"+this.ed_period.getText()+"' ");
						sql.add("delete from gaji_load_pot_m where kode_lokasi = '"+this.app._lokasi+"' and periode = '"+this.ed_period.getText()+"'");
						sql.add("delete from gaji_pot where kode_lokkonsol = '"+this.app._lokKonsol+"' and periode1 = '"+this.ed_period.getText()+"' and periode2= '"+this.ed_period.getText()+"' ");
						sql.add("insert into gaji_load_pot_m (no_bukti, periode, tanggal, keterangan, nik_setuju, kode_lokasi, user_id, tgl_input)values('"+this.ed_nb.getText()+"','"+this.ed_period.getText()+"','"+this.dp_tgl1.getDateString()+"','"+this.ed_ket.getText()+"','"+this.cb_setuju.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',now())");
						var sqlText = [];
						var sqlArray= [];		
						var fieldName = this.colTitle;
						var first = [];						
						for (var i=0;i < this.sg1.getRowCount();i++){							
							for (var c =2;c < this.sg1.getColCount();c++){
                                if (nilaiToFloat(this.sg1.cells(c,i)) > 0){    							    
    								sqlText[c - 2] = "insert into gaji_load_pot_d (no_bukti, nik,kode_param, nilai,kode_lokasi,periode)values('"+this.ed_nb.getText()+"','"+this.sg1.cells(0,i)+"','"+fieldName[c]+"','"+ parseNilai(this.sg1.cells(c,i))+"','"+this.app._lokasi+"','"+this.ed_period.getText()+"')"; 							
    								sqlArray[c - 2] = "insert into gaji_pot(nik, kode_param, periode1, periode2, nilai, kode_lokkonsol)values('"+this.sg1.cells(0,i)+"','"+fieldName[c]+"','"+this.ed_period.getText()+"','"+this.ed_period.getText()+"','"+parseNilai(this.sg1.cells(c,i))+"','"+this.app._lokKonsol+"') ";
    								sql.add(sqlArray[c - 2]);  
									sql.add(sqlText[c - 2]);
    							}														        							
							}
						}						
						this.dbLib.execArraySQL(sql);
					}catch(e){
						systemAPI.alert(e);
					}
				break;
		}
		this.dp_tgl1.setFocus();
	},
	doSelectDate: function(sender, y, m, d){						
		this.ed_period.setText(y+( m < 10 ? "0":"")+m);		
		this.bGen.click();
	},
	doClick: function(sender){
		if (sender == this.bGen)
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gaji_load_pot_m","no_bukti","UPL/"+this.ed_period.getText().substr(2,4),"00000"));
		if (sender == this.bLoad){
			try{
				var dataProvider = this.dbLib.getDataProvider("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'  ",true);
				if (typeof dataProvider != "string"){
					var line,data = [];
					this.sg1.clear();				
					for (var i in dataProvider.rs.rows){
						line = dataProvider.rs.rows[i];
						data = [line.nik, line.nama];
						for (var c in this.colTitle) data.push(0);					
						this.sg1.appendData(data);
					}
				}
			}catch(e){
				alert(e);
			}
		}
		if (sender == this.bRefresh) {			
			this.sg1.clear(1);
		}
	},
	doFindBtnClick: function(sender){
		this.standarLib.showListData(this,"Data Karyawan",sender, undefined,
			"select nik, nama from karyawan where kode_lokasi ='"+this.app._lokasi+"' ",
			"select count(*) from karyawan where kode_lokasi ='"+this.app._lokasi+"' ",
			["nik","nama"],"and",["NIK","Nama"],false);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}
	},
	initColumn: function(){
		try{
			var data = this.dbLib.getDataProvider("select distinct kode_param, nama  from gaji_param_d where kode_lokkonsol = '"+this.app._lokKonsol+"'  and not kode_param in ( 'GDAS','PDAS','PH21','THRT','TYAY','TJAB','TPROF','TRAN','TKHS','BPLS') and jenis = 'POT'",true);
			if (typeof data != "string"){			
				this.sg1.setColCount(data.rs.rows.length + 2);
				var title = ["NIK","Nama"];	
                var hint = ["NIK","Nama"];				
				for (var i in data.rs.rows){
					title.push(data.rs.rows[i].kode_param);					
					hint.push(data.rs.rows[i].nama);
					this.sg1.columns.get(parseInt(i)+2).setHint(data.rs.rows[i].nama);
					this.sg1.columns.get(parseInt(i)+2).setColumnFormat(cfNilai);
				}			
				this.sg1.setColWidth([1],[200]);
				this.sg1.setColTitle(hint);
				this.colTitle = title;
			}
		}catch(e){
			alert(e);
		}
	}
});
