window.app_saku_dmt_transaksi_fKontrakK = function(owner)
{
	if (owner)
	{
		window.app_saku_dmt_transaksi_fKontrakK.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_dmt_transaksi_fKontrakK";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kontrak : Koreksi", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid"),uses("portalui_sgNavigator",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode", readOnly:true,tag: 2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_kontrak = new portalui_saiCBBL(this,{bound:[20,13,250,20],caption:"No Kontrak",btnClick:[this,"doBtnClick"],rightLabelVisible:false,readOnly:true});
		this.bLoad = new portalui_imageButton(this,{bound:[270,13,22,22],click:[this,"doLoadClick"],hint:"Search",image:"icon/"+system.getThemes()+"/reload.png"});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,250,20],caption:"No Dokumen",tag:1});
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,23,500,20],caption:"Keterangan",tag:1});
		this.e_po = new portalui_saiLabelEdit(this,{bound:[20,15,250,20],caption:"No PO",tag:1});
		this.l_tgl2 = new portalui_label(this,{bound:[20,16,100,18],caption:"Tgl Awal Sewa", underline:true,tag:1});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,16,100,18],tag:1});		
		this.l_tgl3 = new portalui_label(this,{bound:[20,19,100,18],caption:"Tgl Akhir Sewa", underline:true,tag:1});
		this.dp_d3 = new portalui_datePicker(this,{bound:[120,19,100,18],tag:1});				
		this.cb_cust = new portalui_saiCBBL(this,{bound:[20,28,200,20],caption:"Customer",btnClick:[this,"doBtnClick"],tag:1, readOnly:true});
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,24,200,20],caption:"Akun AR",btnClick:[this,"doBtnClick"],tag:1, readOnly:true});
		this.cb_pdpt = new portalui_saiCBBL(this,{bound:[20,25,200,20],caption:"Akun Pdpt",btnClick:[this,"doBtnClick"],tag:1, readOnly:true});					
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[550,25,200,20],caption:"Total",tipeText:ttNilai,alignment:alRight, readOnly:true, text:0, tag:1});

		this.p1 = new portalui_panel(this,{bound:[20,26,727,247],caption:"Data Site",tag:1});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,722,200],colCount:3,colTitle:["Site ID","Keterangan Site","Nilai"],
					colWidth:[[0,1,2],[160,400,120]], columnReadOnly:[true,[0,1],[2]], colFormat:[[2],[cfNilai]],buttonStyle:[[0],[bsEllips]],defaultRow:1, 
					ellipsClick:[this, "sgFindBtnClick"],change:[this, "doSgChange"],autoAppend:true,tag:2});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,222,727,25],buttonStyle:2,grid:this.sg});		
		
		this.rearrangeChild(10, 22);		
		setTipeButton(tbAllFalse);
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
window.app_saku_dmt_transaksi_fKontrakK.extend(window.portalui_childForm);
window.app_saku_dmt_transaksi_fKontrakK.implement({
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
					sql.add("update dmt_kontrak set tanggal='"+this.dp_d1.getDateString()+"', periode='"+this.e_periode.getText()+"' "+
						"	,no_dokumen='"+this.e_dok.getText()+"', no_po= '"+this.e_po.getText()+"', tanggal_po='"+this.dp_d2.getDateString()+"' "+
						"	,kode_cust='"+this.cb_cust.getText()+"', nilai='"+parseNilai(this.e_nilai.getText())+"', tanggal_akhir='"+this.dp_d3.getDateString()+"' "+
						"	, akun_ar='"+this.cb_akun.getText()+"', akun_pdpt='"+this.cb_pdpt.getText()+"' "+
						"	, keterangan='"+this.e_ket.getText()+"' "+
						"where no_kontrak ='"+this.e_kontrak.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					
					sql.add("delete from dmt_kontrak_d where no_kontrak ='"+this.e_kontrak.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
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
			case "ubah" :	
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
			case "hapus" : 			    
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from dmt_kontrak_d where no_kontrak ='"+this.e_kontrak.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
				sql.add("delete from dmt_kontrak where no_kontrak ='"+this.e_kontrak.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
				this.dbLib.execArraySQL(sql);
				break;
		}
	},
	doLoadClick: function(sender){
		try{						
			var data = this.dbLib.getDataProvider("select a.no_dokumen, a.no_po, a.tanggal_po, a.kode_cust, b.nama, a.tanggal_akhir, a.tanggal_baps "+
				" , a.keterangan, a.akun_ar, e.nama as nmar, a.akun_pdpt, f.nama as nmpdpt, c.no_fa, d.nama as nmfa, c.nilai "+
				"	from dmt_kontrak a inner join dmt_cust b on b.kode_cust = a.kode_cust and a.kode_lokasi = b.kode_lokasi "+
				"	inner join dmt_kontrak_d c on c.no_kontrak = a.no_kontrak and c.kode_lokasi = a.kode_lokasi "+
				"	inner join fa_asset d on d.no_fa = c.no_fa and d.kode_lokasi = a.kode_lokasi "+
				"	left outer join masakun e on e.kode_akun = a.akun_ar and e.kode_lokasi = a.kode_lokasi "+
				"	left outer join masakun f on f.kode_akun = a.akun_pdpt and f.kode_lokasi = a.kode_lokasi "+
				"where a.no_kontrak = '"+this.e_kontrak.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ");				
			eval("data = "+data+";");
			if (data){
				var line;
				this.sg.clear();
				this.standarLib.clearByTag(this,[1],undefined);
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					this.sg.appendData([line.no_fa, line.nmfa, floatToNilai(line.nilai)]);
				}
				if (line !== undefined){
					setTipeButton(tbUbahHapus);
					this.e_dok.setText(line.no_dokumen);
					this.e_po.setText(line.no_po);
					this.dp_d2.setDateString(line.tanggal_po);
					this.cb_cust.setText(line.kode_cust, line.nama);
					this.dp_d3.setDateString(line.tanggal_akhir);						
					this.cb_akun.setText(line.akun_ar, line.nmar);
					this.cb_pdpt.setText(line.akun_pdpt, line.nmpdpt);
					this.e_ket.setText(line.keterangan);
				}else setTipeButton(tbAllFalse);
				this.doSgChange(this.sg,2,0);
			}
		}catch(e){
			setTipeButton(tbAllFalse);
			systemAPI.alert(e,data);
		}
	},
	doBtnClick: function(sender, event){
		try
		{
			if (sender == this.e_kontrak) {   
			    this.standarLib.showListData(this, "Daftar Kontrak",sender,undefined, 
											  "select a.no_kontrak,a.no_po, a.no_dokumen, a.keterangan, a.kode_cust, b.nama  "+
											  "	from dmt_kontrak a inner join dmt_cust b on b.kode_cust = a.kode_cust and b.kode_lokasi= a.kode_lokasi "+											  
											  "	where a.kode_lokasi='"+this.app._lokasi+"' and a.periode <= '"+this.e_periode.getText()+"' ",
											  "select count(no_kontrak) from dmt_kontrak where kode_lokasi='"+this.app._lokasi+"' and periode <= '"+this.e_periode.getText()+"'",
											  ["no_kontrak","no_po","no_dokumen","keterangan","kode_cust","nama"],"and",
											  ["No Kontrak","No PO","No Dokumen","Keterangan","Kode Cust","Nama"],false);				
			}
			if (sender == this.cb_cust) {   
			    this.standarLib.showListData(this, "Daftar Customer",sender,undefined, 
											  "select kode_cust, nama   from dmt_cust where kode_lokasi='"+this.app._lokasi+"' ",
											  "select count(kode_cust) from dmt_cust where kode_lokasi='"+this.app._lokasi+"' ",
											  ["kode_cust","nama"],"and",["Kode Customer","Nama Customer"],false);				
			}
			if (sender == this.cb_akun || sender == this.cb_pdpt) {   
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No Kontrak: "+ this.e_kontrak.getText()+")");							
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
											  "select a.no_fa, a.nama, b.alamat, b.shelter from dmt_tower b inner join fa_asset a on b.no_fa = a.no_fa and a.kode_lokasi = b.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"' ",
											  "select count(a.no_fa) from dmt_tower b inner join fa_asset a on b.no_fa = a.no_fa and a.kode_lokasi = b.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"' ",
											  ["a.no_fa","a.nama","b.alamat"],"and",["Site Id","Nama","Alamat","Shelter"],false);				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		if (this.e_kontrak !== undefined) this.e_kontrak.setText("");
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
	}
});