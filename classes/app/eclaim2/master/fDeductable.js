window.app_eclaim2_master_fDeductable = function(owner){
	if (owner)
	{
		window.app_eclaim2_master_fDeductable.prototype.parent.constructor.call(this,owner);
		this.className  = "app_eclaim2_master_fDeductable";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Deductable", 0);	
		
		uses("saiCBBL;saiGrid");
		this.cb_ttg = new saiCBBL(this,{bound:[20,10,185,20],caption:"Tertanggung", change:[this,"doChange"]});										
		this.bGen = new button(this,{bound:[620,10,80,20],caption:"Tampil Data",click:"doClick"});
		this.p1 = new panel(this,{bound:[20,12,700,400],caption:"Jenis Asuransi"});						
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,698,350],colCount:8,
			colTitle:["Kode Asuransi","Deskripsi","Polis","Obyek","Penyebab","Curr","Jenis","Nilai"],
			colWidth:[[7,6,5,4,3,2,1,0],[100,100,60,100,100,200,365,100]],buttonStyle:[[0,2,3,4,5,6],[bsEllips,bsEllips,bsEllips,bsEllips,bsEllips,bsAuto]], colFormat:[[7],[cfNilai]],colReadOnly:[true,[1],[]],
			picklist:[[6],[new arrayMap({items:["A","B","C"]})]]});	
		this.sgn = new sgNavigator(this.p1,{bound:[1,373,698,25],buttonStyle:bsTrans, grid:this.sg1});							
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		this.rearrangeChild(10,23);
		try
		{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();						
			this.cb_ttg.onBtnClick.set(this, "FindBtnClick");
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onChange.set(this, "doSgChange");
			this.cb_ttg.setText(this.app._kodeTtg, this.app._namaTtg);		
			this.cb_ttg.setSQL("select kode_ttg,nama from tlk_ttg where kode_lokasi = '"+this.app._lokasi+"' ",["kode_ttg","nama"]);			
			this.dbLib.getDataProviderA("select kode_asuransi, nama from tlk_asuransi where kode_lokasi = '"+this.app._lokasi+"' ");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_eclaim2_master_fDeductable.extend(window.childForm);
window.app_eclaim2_master_fDeductable.implement({
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
		if (modalResult != mrOk) return;
		switch (event)
		{
			case "clear" :
				this.standarLib.clearByTag(this, new Array("0"),this.cb_ttg);	
				this.sg1.clear(1);
				this.cb_ttg.setText(this.app._kodeTtg, this.app._namaTtg);
			break;				
			case "simpan" :
				try{
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("delete from tlk_ddct where kode_ttg = '"+this.cb_ttg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					for (var i=0; i < this.sg1.rows.getLength(); i++){
						if (this.sg1.rowValid(i))
							sql.add("insert into tlk_ddct(kode_ttg,kode_asuransi,no_polis, kode_obyek, kode_sebab, kode_curr, jenis, nilai,kode_lokasi,tgl_input, nik_user) values "+
							" ('"+this.cb_ttg.getText()+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(5,i)+"','"+this.sg1.cells(6,i)+"','"+parseNilai(this.sg1.cells(7,i))+"','"+this.app._lokasi+"',now(),'"+this.app._userLog+"')");
					}
					this.dbLib.execArraySQL(sql);						
				}catch(e){
					system.alert(this, e,"");
				}
			break;			
			case "hapus":
				uses("server_util_arrayList");
				sql = new server_util_arrayList();
				sql.add("delete from tlk_ddct where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg = '"+this.cb_ttg.getText()+"' ");
				this.dbLib.execArraySQL(sql);	
			break;
		}
		this.cb_ttg.setFocus();
	},		
	FindBtnClick:function(sender, event){
		try
		{
			if (sender == this.cb_ttg) 
			{
				this.standarLib.showListData(this, "Data Tertanggung",sender,undefined, 
											  "select kode_ttg, nama  from tlk_ttg where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(kode_ttg) from tlk_ttg where kode_lokasi = '"+this.app._lokasi+"' ",
											  new Array("kode_ttg","nama"),"and",new Array("Kode Tertanggung","Nama"),false);	
			}			
		}catch(e){
			system.alert(this,e,"");
		}
	},
	doClick: function(sender){
		try 
		{
			this.sg1.clear(); 
			setTipeButton(tbSimpan);
			var data = this.dbLib.getDataProvider(" select a.kode_asuransi,b.nama,  a.no_polis, a.kode_obyek , a.kode_sebab, a.kode_curr, a.jenis, nilai from tlk_ddct a "+
				"	inner join tlk_asuransi b on a.kode_asuransi =b.kode_asuransi and a.kode_lokasi=b.kode_lokasi "+
				" where a.kode_ttg = '"+this.cb_ttg.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data !== "string"){
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					this.sg1.appendData([line.kode_asuransi,line.nama, line.no_polis, line.kode_obyek, line.kode_sebab, line.kode_curr, line.jenis, floatToNilai(line.nilai)]);
				}				
			}else {this.sg1.appendRow();}
		} catch(e){
			system.alert(this,e,"");
		}
	},
	doFindBtnClick: function(sender, col, row){
		try
		{
			switch(col)
			{
				case 0 : 
					this.standarLib.showListDataForSG(this, "Daftar Jenis Asuransi",sender, sender.row, sender.col, 
													  "select a.kode_asuransi, a.nama  from tlk_asuransi a "+
													  " inner join tlk_asuransi_ttg b on b.kode_asuransi = a.kode_asuransi and b.kode_lokasi = a.kode_lokasi"+
													  " where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_ttg = '"+this.app._kodeTtg+"' ",
													  "select count(a.kode_asuransi) from tlk_asuransi a "+
													  " inner join tlk_asuransi_ttg b on b.kode_asuransi = a.kode_asuransi and b.kode_lokasi = a.kode_lokasi"+
													  " where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_ttg = '"+this.app._kodeTtg+"' ",													  
													  new Array("a.kode_asuransi","a.nama"),"and",new Array("Kode Asuransi","Deskripsi"),false);
					break;
				case 2 : 
					this.standarLib.ListDataSGFilter(this, "Daftar Polis",sender, sender.row, sender.col, 
													  "select no_polis, keterangan  from tlk_polis where kode_lokasi='"+this.app._lokasi+"' and kode_ttg = '"+this.app._kodeTtg+"' ",
													  "select count(no_polis) from tlk_polis where kode_lokasi='"+this.app._lokasi+"' and kode_ttg = '"+this.app._kodeTtg+"'",
													  new Array("no_polis","keterangan"),"and",new Array("No Polis","Deskripsi"),false);
					break;	
				case 3 : 
					this.standarLib.ListDataSGFilter(this, "Daftar Obyek",sender, sender.row, sender.col, 
													  "select kode_obyek, nama  from tlk_obyek where kode_lokasi='"+this.app._lokasi+"' and kode_ttg = '"+this.app._kodeTtg+"' ",
													  "select count(kode_obyek) from tlk_obyek where kode_lokasi='"+this.app._lokasi+"' and kode_ttg = '"+this.app._kodeTtg+"'",
													  new Array("kode_asuransi","nama"),"and",new Array("Kode Asuransi","Deskripsi"),false);
					break;
				case 4 : 
					this.standarLib.ListDataSGFilter(this, "Daftar Penyebab",sender, sender.row, sender.col, 
													  "select kode_sebab, nama  from tlk_sebab where kode_lokasi='"+this.app._lokasi+"' and kode_ttg = '"+this.app._kodeTtg+"' ",
													  "select count(kode_sebab) from tlk_sebab where kode_lokasi='"+this.app._lokasi+"' and kode_ttg = '"+this.app._kodeTtg+"' ",
													  new Array("kode_sebab","nama"),"and",new Array("Kode Penyebab","Deskripsi"),false);
					break;
				case 5 : 
					this.standarLib.ListDataSGFilter(this, "Daftar Currency",sender, sender.row, sender.col, 
													  "select kode_curr, nama  from curr ",
													  "select count(kode_curr) from curr ",
													  new Array("kode_curr","nama"),"and",new Array("Kode Currency","Deskripsi"),false);
					break;
			}
		}catch(e)
		{
			systemAPI.alert("[app_eclaim2_master_fAsuransiTtg] : doFindBtnClick : " + e);
		}	
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
			switch(methodName)
				{
					case "execArraySQL" :    				
						step="info";
						if (result.toLowerCase().search("error") == -1)					
						{
						  this.app._mainForm.pesan(2,"Proses Lengkap ("+ this.cb_ttg.getText()+" tersimpan.)");
						  this.app._mainForm.bClear.click();              
						}else system.info(this,result,"");
					break;
					case "getDataProvider":
						result = JSON.parse(result);
						this.dataAsuransi = new arrayMap();
						for (var i in result.rs.rows){
							this.dataAsuransi.set(result.rs.rows[i].kode_asuransi, result.rs.rows[i].nama);
						}
					break;
				}
			}catch(e)
			{
			   alert("step : "+step+"; error = "+e);
			}    
		}
	},
	doChange: function(sender){
		this.sg1.clear(1);
	},
	doSgChange: function(sender, col, row){
		if (col == 0 && this.sg1.cells(0, row) != ""){
			var nama = this.dataAsuransi.get(this.sg1.cells(0,row));
			if (nama)
				this.sg1.cells(1,row, nama);
			else {
				this.sg1.onChange.set(this,undefined);
				systemAPI.alert(this.sg1.cells(0,row) +" tidak ada dalam daftar" );
				this.sg1.cells(0,row,"");
				this.sg1.onChange.set(this,"doSgChange");
			}
		}
	}
});
