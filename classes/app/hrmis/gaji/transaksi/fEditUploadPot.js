window.app_hrmis_gaji_transaksi_fEditUploadPot = function(owner)
{
	if (owner)
	{
		window.app_hrmis_gaji_transaksi_fEditUploadPot.prototype.parent.constructor.call(this, owner);
		this.className = "app_hrmis_gaji_transaksi_fEditUploadPot";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Edit Upload Potongan", 0);	
		
		this.maximize();		
		uses("portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar");
		this.ed_lokasi = new portalui_saiCBBL(this,{bound:[20,9,185,20],caption:"Lokasi",text:this.app._lokasi,rightLabelCaption:this.app._namalokasi,btnVisible:false,readOnly:true});
		this.ed_period = new portalui_saiLabelEdit(this,{bound:[20,10,182,20],caption:"Periode",readOnly:true});		
		this.lblTgl1 = new portalui_label(this,{bound:[20,32,101,18],caption:"Tanggal",underline:true});						
		this.dp_tgl1 = new portalui_datePicker(this,{bound:[120,32,82,18], selectDate:[this,"doSelectDate"]});		
		this.ed_nb = new portalui_saiCBBL(this,{bound:[20,78,230,20],caption:"No Bukti", readOnly:true,btnClick:[this,"doFindBtnClick"],change:[this,"doEditChange"], rightLabelVisible:false});					
		this.bGen = new portalui_button(this,{bound:[256,78,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)",click:[this,"doClick"]});		   		
		this.ed_ket = new portalui_saiLabelEdit(this,{bound:[20,122,500,20],caption:"Keterangan",maxLength:150});						
		this.cb_setuju = new portalui_saiCBBL(this,{bound:[20,188,185, 20],caption:"Dibuat",readOnly:true,btnClick:[this,"doFindBtnClick"]});						
		this.cb_copy = new portalui_saiCBBL(this,{bound:[20,18,185, 20],caption:"Copy Dari",readOnly:true,btnClick:[this,"doFindBtnClick"]});						
		this.bLoad = new portalui_button(this,{bound:[800,18,100,20],caption:"Tampil",click:[this,"doClick"]});
		uses("portalui_saiGrid;portalui_sgNavigator");
		this.p1 = new portalui_panel(this,{bound:[20,189,900,260],caption:"Data Upload"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,900,200],colCount:6,
				colTitle:["NIK","Nama","Lembur","Tunj. Khusus","Rapel","K.Beban Kerj"],colReadOnly:[true,[0,1],[]],
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
		this.setTabChildIndex();
	}
};
window.app_hrmis_gaji_transaksi_fEditUploadPot.extend(window.portalui_childForm);
window.app_hrmis_gaji_transaksi_fEditUploadPot.implement({
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
						for (var i=0;i < this.sg1.getRowCount();i++){							
							for (var c =2;c < this.sg1.getColCount();c++){
                                if (nilaiToFloat(this.sg1.cells(c,i)) > 0){    							    
    								sqlText[c - 2] ="insert into gaji_load_pot_d (no_bukti, nik,kode_param, nilai,kode_lokasi,periode)values('"+this.ed_nb.getText()+"','"+this.sg1.cells(0,i)+"','"+fieldName[c]+"','"+ parseNilai(this.sg1.cells(c,i))+"','"+this.app._lokasi+"','"+this.ed_period.getText()+"')"; 							
    								sqlArray[c - 2] = "insert into gaji_pot(nik, kode_param, periode1, periode2, nilai, kode_lokkonsol)values('"+this.sg1.cells(0,i)+"','"+fieldName[c]+"','"+this.ed_period.getText()+"','"+this.ed_period.getText()+"','"+parseNilai(this.sg1.cells(c,i))+"','"+this.app._lokKonsol+"') ";
    								sql.add(sqlText[c - 2]);  
									sql.add(sqlArray[c - 2]);  
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
				var dataProvider = this.dbLib.getDataProvider("select distinct a.nik, b.nama, "+this.sqlField+" from gaji_load_pot_d a inner join karyawan b on b.nik = a.nik and b.kode_lokasi = a.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"' and a.no_bukti ='"+this.cb_copy.getText()+"'  group by a.nik, b.nama",true);				
				if (typeof dataProvider != "string"){
					var line,data = [];
					this.sg1.clear();				
					for (var i in dataProvider.rs.rows){
						line = dataProvider.rs.rows[i];
						data = [];  
						for (var c in this.colTitle) {
                            if (this.colTitle[c] != "NIK" && this.colTitle[c] != "Nama")
                                data.push(floatToNilai(parseFloat(eval("line."+this.colTitle[c].toLowerCase()))));					
                            else 
                                data.push(eval("line."+this.colTitle[c].toLowerCase()));					
                        }
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
	   if (sender == this.cb_setuju)
		  this.standarLib.showListData(this,"Data Karyawan",sender, undefined,
			"select nik, nama from karyawan where kode_lokasi ='"+this.app._lokasi+"' ",
			"select count(*) from karyawan where kode_lokasi ='"+this.app._lokasi+"' ",
			["nik","nama"],"and",["NIK","Nama"],false);
		if (sender == this.cb_copy)
	       this.standarLib.showListData(this,"Data Upload Potongan",sender, undefined,
        			"select no_bukti, keterangan from gaji_load_pot_m where kode_lokasi ='"+this.app._lokasi+"' ",
        			"select count(*) from gaji_load_pot_m where kode_lokasi ='"+this.app._lokasi+"' ",
        			["no_bukti","keterangan"],"and",["No Bukti","Keterangan"],false);
		if (sender == this.ed_nb)
	       this.standarLib.showListData(this,"Data Upload Potongan",sender, undefined,
        			"select no_bukti, keterangan from gaji_load_pot_m where kode_lokasi ='"+this.app._lokasi+"' ",
        			"select count(*) from gaji_load_pot_m where kode_lokasi ='"+this.app._lokasi+"' ",
        			["no_bukti","keterangan"],"and",["No Bukti","Keterangan"],false);
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
	doEditChange: function(sender){
	       try{    
                if (this.sqlField === undefined) return;
                var dataProvider = this.dbLib.getDataProvider("select distinct aa.periode, aa.tanggal, aa.keterangan, aa.nik_setuju, ifnull(c.nama,'-') as nmsetuju, a.nik, b.nama, "+this.sqlField+" "+
                "   from gaji_load_pot_m aa inner join gaji_load_pot_d a on a.no_bukti = aa.no_bukti and a.kode_lokasi = aa.kode_lokasi "+
                " inner join karyawan b on b.nik = a.nik and b.kode_lokasi = a.kode_lokasi "+
                " left outer join karyawan c on c.nik = aa.nik_setuju and c.kode_lokasi = a.kode_lokasi "+
                " where a.kode_lokasi = '"+this.app._lokasi+"' and a.no_bukti ='"+this.ed_nb.getText()+"'  group by a.nik, b.nama",true);				
				if (typeof dataProvider != "string"){
				    if (dataProvider.rs.rows[0]){
    					var line,data = [];    					
    					this.sg1.clear();				
    					for (var i in dataProvider.rs.rows){
    						line = dataProvider.rs.rows[i];
    						if (i == 0){
        					   this.ed_period.setText(line.periode);
                               this.dp_tgl1.setText(line.tanggal);
        					   this.ed_ket.setText(line.keterangan);
        					   this.cb_setuju.setText(line.nik_setuju, line.nmsetuju);
                            }
    						data = [];  
    						for (var c in this.colTitle) {
                                if (this.colTitle[c] != "NIK" && this.colTitle[c] != "Nama")
                                    data.push(floatToNilai(parseFloat(eval("line."+this.colTitle[c].toLowerCase()))));					
                                else 
                                    data.push(eval("line."+this.colTitle[c].toLowerCase()));					
                            }
    						this.sg1.appendData(data);
    					}    					
				    }
                    setTipeButton(tbSimpan);
				}
			}catch(e){
				alert(e);
			}
	},
	initColumn: function(){
		try{
			var data = this.dbLib.getDataProvider("select distinct kode_param, nama  from gaji_param_d where kode_lokkonsol = '"+this.app._lokKonsol+"'  and not kode_param in ( 'GDAS','PDAS','PH21','THRT','TYAY','TJAB','TPROF','TRAN','TKHS','BPLS') and jenis = 'POT'",true);
			if (typeof data != "string"){			
				this.sg1.setColCount(data.rs.rows.length + 2);
				var title = ["NIK","Nama"];	
                var hint = ["NIK","Nama"],line;
                this.sqlField ="";				
				for (var i in data.rs.rows){
				    line = data.rs.rows[i];			    
					title.push(line.kode_param);					
					hint.push(line.nama);
					this.sg1.columns.get(parseInt(i)+2).setHint(line.nama);
					this.sg1.columns.get(parseInt(i)+2).setColumnFormat(cfNilai);
					if (i > 0) this.sqlField += ",";
					this.sqlField += " sum(case when kode_param = '"+line.kode_param+"' then nilai else 0 end) as "+line.kode_param.toLowerCase()+" ";
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
