window.app_budget_transaksi_fParamGaji = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fParamGaji.prototype.parent.constructor.call(this, owner);
		this.className = "app_budget_transaksi_fParamGaji";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Upload Pendapatan", 0);	
		
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
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,235,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
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
window.app_budget_transaksi_fParamGaji.extend(window.portalui_childForm);
window.app_budget_transaksi_fParamGaji.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   
    		this.sg1.clear();
    		this.sg1.showLoading();
    		var line,lineData = [];	
    		var first = true;
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
						sql.add("delete from gaji_load_pdpt_d where kode_lokasi = '"+this.app._lokasi+"' and periode = '"+this.ed_period.getText()+"' ");
						sql.add("delete from gaji_load_pdpt_m where kode_lokasi = '"+this.app._lokasi+"' and periode = '"+this.ed_period.getText()+"'");
						sql.add("delete from gaji_pdpt where kode_lokkonsol = '"+this.app._lokKonsol+"' and periode1 = '"+this.ed_period.getText()+"' and periode2= '"+this.ed_period.getText()+"' ");
						sql.add("insert into gaji_load_pdpt_m (no_bukti, periode, tanggal, keterangan, nik_setuju, kode_lokasi, user_id, tgl_input)values('"+this.ed_nb.getText()+"','"+this.ed_period.getText()+"','"+this.dp_tgl1.getDateString()+"','"+this.ed_ket.getText()+"','"+this.cb_setuju.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',now())");
						var sqlText = [];
						var sqlArray= [];		
						var fieldName = this.colTitle;
						var first = [];
						for (var c = 2;c < this.sg1.getColCount();c++){
							sqlArray[sqlArray.length]="insert into gaji_pdpt(nik, kode_param, periode1, periode2, nilai, kode_lokkonsol)values";
							sqlText[sqlText.length] = "insert into gaji_load_pdpt_d (no_bukti, nik,kode_param, nilai,kode_lokasi,periode)values";
							first.push(true);
						}
						
						for (var i=0;i < this.sg1.getRowCount();i++){														
                            for (var c =7;c < this.sg1.getColCount();c++){
                                if (nilaiToFloat(this.sg1.cells(c,i)) > 0){
    							    if(!first[c-7]) {						
    									sqlArray[c - 7] += ",";
    									sqlText[c - 7] += ",";				
        							} 
    								sqlText[c - 7] +="('"+this.ed_nb.getText()+"','"+this.sg1.cells(0,i)+"','"+fieldName[c]+"','"+ parseNilai(this.sg1.cells(c,i))+"','"+this.app._lokasi+"','"+this.ed_period.getText()+"')"; 							
    								sqlArray[c - 7] += "('"+this.sg1.cells(0,i)+"','"+fieldName[c]+"','"+this.ed_period.getText()+"','"+this.ed_period.getText()+"','"+parseNilai(this.sg1.cells(c,i))+"','"+this.app._lokKonsol+"') ";
    								first[c-7] = false;
    							}														        							
							}
							
						}					
						for (var i in sqlArray){						
                            if (sqlText[i] != "insert into gaji_load_pdpt_d (no_bukti, nik,kode_param, nilai,kode_lokasi,periode)values")
                                sql.add(sqlText[i]);  
							if (sqlArray[i] != "insert into gaji_pdpt(nik, kode_param, periode1, periode2, nilai, kode_lokkonsol)values") 
                                sql.add(sqlArray[i]);
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
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gaji_load_pdpt_m","no_bukti","UPL/"+this.ed_period.getText().substr(2,4),"00000"));
		if (sender == this.bLoad){
			try{
				var dataProvider = this.dbLib.getDataProvider("select nik, nama, kode_band,kode_pp as kode_loker, kode_jab, kode_kota, 0 as idx from agg_karyawan where kode_lokasi = '"+this.app._lokasi+"'  ",true);
				if (typeof dataProvider != "string"){
					var line,data = [];
					this.sg1.clear();
					this.dataGaji = [];
					for (var i in dataProvider.rs.rows){
						line = dataProvider.rs.rows[i];
						data = [line.nik, line.nama, line.kode_band, line.kode_loker, line.kode_jab, line.kode_kota, line.idx];
						for (var c in this.colTitle) data[data.length] = '0';
						data[data.length] = '0';
						//this.sg1.appendData(data);						
						this.dataGaji[this.dataGaji.length] = data;
					}
					this.loadData(1);
					this.sgn.setTotalPage(Math.ceil(this.dataGaji.length / 10));
					this.sgn.rearrange();
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
			var data = this.dbLib.getDataProvider("select distinct kode_param, nama  from agg_param where kode_lokasi = '"+this.app._lokasi+"' and jenis = 'PDPT'",true);
			if (typeof data != "string"){							
				this.sg1.setColCount(data.rs.rows.length + 8);
				var title = [];	
                var hint = ["NIK","Nama","Band","Loker","Jabatan","Kota","Index"];				
				for (var i in data.rs.rows){
					title.push(data.rs.rows[i].kode_param);					
					hint.push(data.rs.rows[i].nama);
					this.sg1.columns.get(parseInt(i)+7).setHint(data.rs.rows[i].nama);
					this.sg1.columns.get(parseInt(i)+7).setColumnFormat(cfNilai);
				}					
				hint.push("Total");
				this.sg1.columns.get(data.rs.rows.length+7).setColumnFormat(cfNilai);
				this.sg1.setColWidth([1],[200]);
				this.sg1.setColTitle(hint);
				this.colTitle = title;
			}
		}catch(e){
			alert(e);
		}
	},
	loadData: function(page){
		var start = (page - 1) * 10;
		var finish = start + 10;
		if (finish > this.dataGaji.length ) finish = this.dataGaji.length;
		this.sg1.clear()
		for (var i=start;i < finish;i++){
			this.sg1.appendData(this.dataGaji[i]);
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page){
		this.loadData(page);
	}
});
