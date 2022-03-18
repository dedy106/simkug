window.app_assetsap_transaksi_fJarSample = function(owner)
{
	if (owner)
	{
		window.app_assetsap_transaksi_fJarSample.prototype.parent.constructor.call(this,owner);
		this.className  = "app_assetsap_transaksi_fJarSample";
		this.maximize();
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Sampling Data Jaringan", 0);	
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		try
		{		
			uses("saiCBBL;util_standar");
			this.cb_ba = new saiCBBL(this,{bound:[20,0,200,20], caption:"BA", multiSelection: false, change:[this,"doEditChange"],
				sql: ["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' ",["kode_lokfa","nama"],false,["Kode BA","Nama"],"and","Daftar BA",true]
			});
			uses("datePicker;saiCBBL;saiGrid;util_file;uploader;app_assetsap_transaksi_fSvrUpload;checkBox");			
			this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
			this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});						
			this.ed_nb = new saiLabelEdit(this,{bound:[20,2,200,20],caption:"No. Transaksi",readOnly:true});
			this.bGen = new button(this,{bound:[230,2,80,20],caption:"Generate",click:"doClick"});					
			this.ed_plnt = new saiCBBL(this, {bound:[20,1,180,20], caption:"Regional", 				
				multiSelection: false,//inner join amu_alt_konv_d b on b.jns_proc = 'Jaringan' and b.kode_netre = a.kode_regional and b.periode = '"+this.app._periode+"' 
				sql:["select a.kode_regional, a.nama from amu_regional a ", ["kode_regional", "nama"], false, ["Kode Regional","Deskripsi"], "where", "Daftar Regional",false],
				change:[this,"doEditChange"]});			
			this.ed_area = new saiCBBL(this, {bound:[20,33,200,20], caption:"Area", multiSelection:false,
				sql:["select kode_area, nama from amu_dcsarea ",["kode_area","nama"],false, ["Kode Area","Nama"],"where","Daftar Area",true],
				change:[this,"doEditChange"]
			});
			this.ed_kode = new saiCBBL(this, {
				bound: [20, 10, 200, 20],
				caption: "Location/STO",
				multiSelection:false, 
				rightLabelVisible:false,
				sql:["select kode_loksto, nama from amu_loksto ", ["kode_loksto", "nama"], false, ["Location","Deskripsi"], "where", "Daftar Location/STO",false]
			});							
			this.p1 = new panel(this,{bound:[20,11,600,200], caption:"Data Kabel Primer"});
			this.sg = new saiGrid(this.p1,{bound:[0,20,600,150], colCount:4, colTitle:["RK","PRIMER","KAP","Ref. Evidence"], 
				colWidth:[[3,2,1,0],[120,100,100,200]], 
				buttonStyle:[[0],[bsEllips]],
				rowCount:1,autoPaging:true, rowPerPage:20, pasteEnable:true, afterPaste:[this,"doAfterPaste"],
				ellipsClick : [this,"doEllipsClick"], 
				change: [this,"doGridChange"]
			});
			this.sgn = new sgNavigator(this.p1,{bound:[0,this.p1.height - 25, 600, 25], borderStyle:3, buttonStyle:bsTransNav, grid:this.sg, pager:[this,"doPager"]});
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);		
			
			this.ed_kode.onChange.set(this, "doEditChange");
			
			
			this.setTabChildIndex();		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_assetsap_transaksi_fJarSample.extend(window.childForm);
//------------------------------------------------------------------ event
window.app_assetsap_transaksi_fJarSample.implement({
	mainButtonClick : function(sender){
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
		try{					
			switch (event)
			{
				case "clear" :
					if (modalResult == mrOk)
					{
						this.standarLib.clearByTag(this, new Array("0"),this.ed_kode);				
					}
					break;
				case "simpan" :
					if (modalResult == mrOk)
					{
						
						this.doClick();
							uses("server_util_arrayList");
							sql = new server_util_arrayList();
							sql.add("insert into amu_datajar_sample(no_jarsample,kode_lokasi, kode_lokfa, kode_loksto, kode_area, kode_regional,tanggal, periode,  nik_user, tgl_input)  values "+
									"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_ba.getText()+"','"+this.ed_kode.getText()+"','"+this.ed_area.getText()+"','"+this.ed_plnt.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.app._periode+"','"+this.app._userLog+"', now())");
							
							for (var i = 0; i < this.sg.getRowCount() ; i++){
								sql.add("insert into amu_datajar_sampled(no_jarsample,kode_lokasi, kode_loksto, kode_regional, kode_area, no_rk, primer, kap, no_evd ) "+
								"values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ed_kode.getText()+"','"+this.ed_plnt.getText()+"','"+this.ed_area.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"')");
							}
							this.dbLib.execArraySQL(sql);							
					}
					break;
				case "ubah" :
					if (modalResult == mrOk)
					{
							uses("server_util_arrayList");					
							var sql = new server_util_arrayList();
							sql.add("delete from amu_datajar_sampled where kode_loksto = '"+this.ed_kode.getText()+"' and kode_area ='"+this.ed_area.getText()+"'");
							for (var i = 0; i < this.sg.getRowCount() ; i++){
								sql.add("insert into amu_datajar_sampled(no_jarsample, kode_loksto, kode_regional, kode_area, no_rk, primer, kap, no_evd ) "+
								"values('"+this.ed_nb.getText()+"','"+this.ed_kode.getText()+"','"+this.ed_plnt.getText()+"','"+this.ed_area.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"')");
							}
							this.dbLib.execArraySQL(sql);	
					}
					break;
				case "hapus" :
				   if (modalResult == mrOk)
				   {
						uses("server_util_arrayList");					
							var sql = new server_util_arrayList();
							sql.add("delete from amu_loksto where kode_loksto ='"+this.ed_kode.getText()+"' and plant = '"+this.ed_plnt.getText()+"' ");
							this.dbLib.execArraySQL(sql);	
				   }
					break;
			}			
		}
		catch(e)
		{
			system.alert(this, e,"");
		}	
	},
	doEditChange: function(sender){		
		if (sender == this.ed_kode) 
		{
			if (this.ed_kode.getText() != "")
			{
				try
				{					
					uses("server_util_arrayMap");
					var data = this.dbLib.getDataProvider("select no_rk, primer, kap "+
													"from amu_loksto_d a "+
													"where kode_loksto = '"+this.ed_kode.getText()+"' ",true);
					if (typeof data != "string"){
						this.sg.clear();						
						for (var i in data.rs.rows){
							var line = data.rs.rows[i];
							this.sg.appendData([line.no_rk, line.primer, line.kap, '-']);
						}
					}else throw (data);
				}catch(e){
					system.alert(this, e,"");
				}
			}
		} 
		if (sender == this.ed_area){
			this.ed_kode.setSQL("select kode_loksto, nama from amu_loksto where kode_area = '"+sender.getText()+"' and plant = '"+this.ed_plnt.getText()+"' ", ["kode_loksto", "nama"], false, ["Kode Lokasi","Nama Lokasi"], "where", "Daftar Lokasi",false);
		}
		if (sender == this.ed_plnt || sender == this.cb_ba){
			this.ed_area.setSQL("select kode_area, nama from amu_dcsarea where kode_regional = '"+this.ed_plnt.getText()+"' ",["kode_area","nama"],false, ["Kode Area","Nama"],"where","Daftar Area",true);
			this.ed_kode.setSQL("select kode_loksto, nama from amu_loksto where  plant = '"+this.ed_plnt.getText()+"' and kode_lokfa = '"+this.cb_ba.getText()+"' ", ["kode_loksto", "nama"], false, ["Kode Lokasi","Nama Lokasi"], "where", "Daftar Lokasi",false);
		}
		
	},
	FindBtnClick: function(sender, event){				
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1)					
					{
					  this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_kode.getText()+")");
					  this.app._mainForm.bClear.click();              
					}else
						 system.alert(this, result,"");
					break;
			}
		}
	},	
	doPager: function(sender, page){
		this.sg.doSelectPage(page);
	},
	doAfterPaste: function(sender, rowCount, page){
		this.sgn.setTotalPage(sender.getTotalPage());
		this.sgn.rearrange();
		this.sgn.activePage = page;
	},
	doClick: function(sender){
		this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_datajar_sample','no_jarsample',"SJAR/"+this.dp_tgl.getYear()+"/",'0000'));
	},
	doEllipsClick:function(sender, col ,row){		
			switch(col)
			{
				case 0 : 
					this.standarLib.showListDataForSG(this, "Daftar Jaringan STO",this.sg, this.sg.row, this.sg.col, 
													  "select no_rk, primer, kap from amu_loksto_d where kode_loksto = '"+this.ed_kode.getText()+"' ",
													  "select count(*)  from amu_loksto_d where kode_loksto = '"+this.ed_kode.getText()+"' ",
													  ["no_rk","primer","kap"],"where",["RK","Primer","KAP"],false);
					break;				
			}	
	},
	doGridChange: function(sender, col, row){
		if (sender.dataFromList){
			if (col == 0){
				sender.editData(row,[sender.dataFromList[1],sender.dataFromList[2]], [1,2]);
			}
		}
	}
});
