window.app_saku_dmt_transaksi_fKontrak = function(owner)
{
	if (owner)
	{
		window.app_saku_dmt_transaksi_fKontrak.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_dmt_transaksi_fKontrak";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kontrak : Input", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid"),uses("portalui_sgNavigator",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode", readOnly:true,tag: 2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_kontrak = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Kontrak", readOnly: true});
		this.b_gen = new portalui_button(this,{bound:[270,13,80,18],caption:"Generate",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,250,20],caption:"No Dokumen", maxLength: 100});
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,23,500,20],caption:"Keterangan"});
		this.e_po = new portalui_saiLabelEdit(this,{bound:[20,15,250,20],caption:"No PO" , maxLength: 100});
		this.l_tgl2 = new portalui_label(this,{bound:[20,16,100,18],caption:"Tgl Awal Sewa", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,16,100,18]});
		this.l_tgl3 = new portalui_label(this,{bound:[20,19,100,18],caption:"Tgl Akhir Sewa", underline:true});
		this.dp_d3 = new portalui_datePicker(this,{bound:[120,19,100,18]});		
		this.cb_cust = new portalui_saiCBBL(this,{bound:[20,20,200,20],caption:"Customer",btnClick:[this,"doBtnClick"],readOnly : true});
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,24,200,20],caption:"Akun Piutang",btnClick:[this,"doBtnClick"], readOnly : true});
		this.cb_pdpt = new portalui_saiCBBL(this,{bound:[20,25,200,20],caption:"Akun Pendapatan",btnClick:[this,"doBtnClick"], readOnly : true});					
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[550,25,200,20],caption:"Total",tipeText:ttNilai,alignment:alRight, readOnly:true, text:0});
		
		this.p1 = new portalui_panel(this,{bound:[20,26,727,247],caption:"Data Site"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,722,200],colCount:3,colTitle:["Site ID","Keterangan Site","Nilai"],
					colWidth:[[0,1,2],[160,400,120]], columnReadOnly:[true,[0,1],[2]], colFormat:[[2],[cfNilai]],buttonStyle:[[0],[bsEllips]],defaultRow:1, 
					ellipsClick:[this, "sgFindBtnClick"],change:[this, "doSgChange"],autoAppend:true,tag:2});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,222,727,25],buttonStyle:2,grid:this.sg});		
		
		this.rearrangeChild(10, 22);		
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try
		{		    
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    uses("util_standar");
		    this.standarLib = new util_standar();
		    
			uses("util_addOnLib");
		    this.addOnLib = new util_addOnLib();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();						
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_dmt_transaksi_fKontrak.extend(window.portalui_childForm);
window.app_saku_dmt_transaksi_fKontrak.implement({
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
	simpan: function(){			
		try{						
		
			if (this.standarLib.checkEmptyByTag(this, [0,1,2]))
			{
				try
				{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into dmt_kontrak(no_kontrak,tanggal, periode, no_dokumen, no_po, tanggal_po, kode_cust, nilai, tanggal_akhir, tanggal_baps, akun_ar, akun_pdpt, akun_ppn, keterangan, kode_lokasi,nik_user, tgl_input )values" +
						"	('"+this.e_kontrak.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"' "+
						" 	,'"+this.e_po.getText()+"','"+this.dp_d2.getDateString()+"','"+this.cb_cust.getText()+"','"+parseNilai(this.e_nilai.getText())+"' "+
						" 	,'"+this.dp_d3.getDateString()+"',now(),'"+this.cb_akun.getText()+"','"+this.cb_pdpt.getText()+"','-','"+this.e_ket.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',now())");
					if (this.sg.getRowValidCount() > 0){
						var d="insert into dmt_kontrak_d(no_kontrak, kode_lokasi, no_fa, nilai)values";
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (i > 0) d+= ",";
								d += "('"+this.e_kontrak.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(2,i))+")";
							}
						}	
						sql.add(d);
					}					
					this.dbLib.execArraySQL(sql);
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_kontrak);
					this.sg.clear(1);
				}
				break;			
			case "simpan" :	
				if (nilaiToFloat(this.e_nilai.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai kontrak tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				var temu = "0";
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						for (var j=i+1;j < this.sg.getRowCount();j++){
							if (this.sg.rowValid(j)){
								if (this.sg.cells(0,i) == this.sg.cells(0,j)) temu = "1";
							}
						}
					}
				}
				if (temu == "1"){
					system.alert(this,"Data site duplikasi","Data Site duplikasi di baris["+j+"]");
					return false;   
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())) {
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
		}
	},
	doChange: function(sender){
		try{			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_cust) 
			{   
			    this.standarLib.showListData(this, "Daftar Customer",sender,undefined, 
											  "select kode_cust, nama   from dmt_cust where kode_lokasi='"+this.app._lokasi+"' ",
											  "select count(kode_cust) from dmt_cust where kode_lokasi='"+this.app._lokasi+"' ",
											  ["kode_cust","nama"],"and",["Kode Customer","Nama Customer"],false);				
			}
			if (sender == this.cb_akun || sender == this.cb_pdpt) 
			{   
			    this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
											  "select kode_akun, nama  from masakun where kode_lokasi='"+this.app._lokasi+"' and block = '0' ",
											  "select count(kode_akun) from masakun where kode_lokasi='"+this.app._lokasi+"' and block = '0'",
											  ["kode_akun","nama"],"and",["Kode Akun","Nama"],false);				
			}					
		}catch(e){
			systemAPI.alert(e);
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
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No Kontrak : "+ this.e_kontrak.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e)
			{
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	sgFindBtnClick: function(sender, col, row){
		if (col == 0){
			this.standarLib.showListDataForSG(this, "Daftar Site",sender,row,col, 
											  "select a.no_fa, a.nama, b.alamat, b.shelter from dmt_tower b inner join fa_asset a on a.no_fa = b.no_fa and a.kode_lokasi = b.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"' ",
											  "select count(a.no_fa) from dmt_tower b inner join fa_asset a on a.no_fa = b.no_fa and a.kode_lokasi = b.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"' ",
											  ["a.no_fa","a.nama","b.alamat"],"and",["Site Id","Nama","Alamat","Shelter"],false);				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		if (this.b_gen !== undefined) this.b_gen.click();
	},
	doSgChange: function(sender, col, row){		
		try{
			if (col == 2){			
				var tot = 0;			
				for (var i = 0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)) {
						if (this.sg.cells(2,i) != "") {
							tot += nilaiToFloat(this.sg.cells(2,i));
						}
					}
				}
				this.e_nilai.setText(floatToNilai(tot));
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doClick:function(sender){
		this.e_kontrak.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"dmt_kontrak","no_kontrak",this.app._lokasi+"-PK"+this.e_periode.getText().substr(2,4)+".","00000"));
	}
});