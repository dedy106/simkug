window.app_mede_transaksi_fVerpo = function(owner)
{
	if (owner)
	{
		window.app_mede_transaksi_fVerpo.prototype.parent.constructor.call(this,owner);
		this.className  = "app_mede_transaksi_fVerpo";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi Dokumen PO: Input", 0);	
		
		this.ed_period = new portalui_saiLabelEdit(this,{bound:[20,10,182,20],caption:"Periode",readOnly:true});
		this.lblTgl1 = new portalui_label(this,{bound:[20,32,101,18],caption:"Tanggal",underline:true});
		uses("portalui_datePicker;portalui_saiGrid;portalui_saiTable;portalui_sgNavigator;util_standar;util_addOnLib");	
		this.dp_tgl1 = new portalui_datePicker(this,{bound:[120,32,82,18]});		
		this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,56,220,20],caption:"No Verifikasi",readOnly:true});
		this.bGen = new portalui_button(this,{bound:[246,56,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)"});
		this.ed_desc = new portalui_saiLabelEdit(this,{bound:[20,78,500,20],caption:"Deskripsi",maxLength:150});
		this.cb_pembuat = new portalui_saiCBBL(this,{bound:[20,100,185,20],caption:"Dibuat Oleh",readOnly:true});
		this.cb_setuju = new portalui_saiCBBL(this,{bound:[20,122,185,20],caption:"Disetujui VP Area", readOnly:true});
		this.cb_setuju2 = new portalui_saiCBBL(this,{bound:[20,123,185,20],caption:"Disetujui VP Pro.", readOnly:true});
		this.cb_setuju3 = new portalui_saiCBBL(this,{bound:[20,124,185,20],caption:"Disetujui Dir.", readOnly:true});
		
		this.bShow = new portalui_button(this,{bound:[465,124,80,20],caption:"Tampil"});
		this.bPAll = new portalui_button(this,{bound:[546,124,80,20],caption:"APP All",icon:"url(icon/"+system.getThemes()+"/process.png)"});		
		this.p1 = new portalui_panel(this,{bound:[20,144,900,330],caption:"Daftar Dokumen Purchase Order"});		
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,895,165],colCount:12,colTitle:["Status","Catatan","No PO","No Dokumen","Vendor","Tgl Mulai","Tgl Selesai","Deskripsi","Currency","Nilai","PPN","Pnj"],
			colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,60,200,80,80,100,100,100,200,60]],
			colReadOnly:[true,[2,3,4,5,6,7,8,9,10,11],[]],buttonStyle:[[0],[bsAuto]],colFormat:[[9,10],[cfNilai]]});						
		this.sg1.columns.get(0).setPicklist(new portalui_arrayMap({items:["APP","NONAPP","INPROG"]}))		
		this.sg2 = new portalui_saiTable(this.p1,{bound:[1,190,895,135],tag:2,colTitle:["No","Kode Akun","Nama Akun","Kode Brg","Nama Brg","Satuan","Qty","Nilai","Sub Ttl"]});
		this.rearrangeChild(10,23);
		this.sgNav =  new portalui_sgNavigator(this,{bound:[623,this.bShow.top,297,25],border:0,buttonStyle:3});
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);			
			this.standarLib = new util_standar();						
			this.addOnLib=new util_addOnLib();
		
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.cb_pembuat.onChange.set(this, "doEditChange");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onChange.set(this, "doEditChange");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.bPAll.onClick.set(this, "pAllClick");
			this.sg1.onDblClick.set(this,"sg1ondblclick");
			this.sgNav.onPager.set(this, "doSelectedPage");
			this.bGen.onClick.set(this, "genClick");
			this.bShow.onClick.set(this, "showClick");
			
			this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(1); this.sg2.clearAll();
			this.baris = this.app._baris;
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_mede_transaksi_fVerpo.extend(window.portalui_childForm);
window.app_mede_transaksi_fVerpo.implement({
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
	simpan : function(){
		this.bGen.click();
		if (this.standarLib.checkEmptyByTag(this, new Array("0")))
		{
			try
			{
				var tgl = new Date();
				uses("server_util_arrayList");
				sql = new server_util_arrayList();
			
				sql.add("insert into doc_verpo_m (no_ver,kode_lokasi,keterangan,tanggal,periode,no_del,nik_buat,nik_app,nik_user,tgl_input,nilai) values "+
						"       ('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ed_desc.getText()+"','"+this.dp_tgl1.getDate()+"',"+
								"'"+this.ed_period.getText()+"','-','"+this.cb_pembuat.getText()+"','"+this.cb_setuju.getText()+
								"','"+this.app._userLog+"',now(),0)");
													
				var vprog = "";
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{
					if (this.sg1.getCell(0,i) != "INPROG")
					{
						sql.add("insert into doc_verpo_d (no_ver,no_bukti,status,catatan,no_del,kode_lokasi) values "+
								"('"+this.ed_nb.getText()+"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(0,i)+"','"+this.sg1.getCell(1,i)+"','-','"+this.app._lokasi+"')");
						
						if (this.sg1.getCell(0,i) == "APP") {vprog = "1";}
						if (this.sg1.getCell(0,i) == "NONAPP") {vprog = "X";}
						
						sql.add("update doc_po_m set progress='"+vprog+"' where no_po='"+this.sg1.getCell(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
				}					
				this.dbLib.execArraySQL(sql);	
			}
			catch(e)
			{
				system.alert(this, e,"");
			}
		}
	},
	doModalResult : function(event, modalResult){
		if (modalResult != mrOk) return false;
		
		switch (event)
		{
			case "clear" :
				
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this, new Array("0"),this.dp_tgl1);				
					this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
					this.sg1.clear(); this.sg1.appendRow();
					this.sg2.clearAll();
				}
				break;
			case "simpan" :
				
				var cekData = "F";
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{
					if (((new Date()).strToDate(this.dp_tgl1.getDate())  < (new Date()).strToDate(this.sg1.getCell(5,i))) && ((this.sg1.getCell(0,i) == "APP") || (this.sg1.getCell(0,i) == "NONAPP")))
					{
						system.alert(this,"Tanggal verifikasi kurang dari tanggal dokumen [baris "+i+"].","");
						return false;
					}
					if ((this.sg1.getCell(0,i) == "APP") || (this.sg1.getCell(0,i) == "NONAPP"))
					cekData = "T";
				}			
				if (cekData == "F")
				{
					system.alert(this,"Tidak ada transaksi yang diverifikasi.","Pilih APP atau NON APP untuk memverifikasi di kolom status.");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText()))
				{
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.ed_period.getText())) 
				{
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else
					{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}else this.simpan();
				break;			
				
			case "simpancek" : this.simpan();
				break;			
		}
	},
	pAllClick : function(sender){
		for (var i=0; i < this.sg1.rows.getLength(); i++)
		{
			this.sg1.setCell(0,i,"APP");
		}
	},
	doSelectedPage: function(sender, page){
		this.dbLib.listData(this.scriptSql, page, this.baris);
	},
	showClick: function(sender){
		try
		{
			this.sg1.clear();
			this.sg1.appendRow();
			this.sg2.clearAll();
			
			var pageCount = this.dbLib.getRowCount("select count(no_po) "+
							"from doc_po_m "+
							"where progress='0' and periode<='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_del='-' ",this.baris);
			
			this.scriptSql = "select 'INPROG' as status,'-' as catatan,a.no_po,a.no_dokumen,b.nama as vendor,a.tgl_mulai,a.tgl_selesai,"+
							"       a.keterangan,a.kode_curr,a.nilai,a.nilai_ppn, "+
							"       d.nama as pnj "+
							"from doc_po_m a "+
							"            inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
							"            inner join karyawan d on d.nik=a.nik_pnj and a.kode_lokasi=d.kode_lokasi "+
							"where a.progress='0' and a.periode<='"+this.ed_period.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_del='-' ";
					
			this.dbLib.listData(this.scriptSql, 1, this.baris);
			
			this.sgNav.setTotalPage(pageCount);
			this.sgNav.rearrange();
			this.sgNav.activePage = 0;	
			this.sgNav.setButtonStyle(3);
			if (pageCount > 0)
			{
				if (this.sgNav.imgBtn1 != undefined)
					this.sgNav.setSelectedPage(this.sgNav.imgBtn1);
			}
			
		} catch(e){
 			alert(e);
		}
	},
	genClick: function(sender){
		try
		{
			if (this.ed_period.getText() != "")
			{
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'verpo_m','no_ver',this.app._lokasi+"-VPO"+this.ed_period.getText().substr(2,4)+".",'0000'));
				this.ed_desc.setFocus();
			}
			else
			{
				system.alert(this,"Periode harus valid.","");
			}
		}
		catch (e)
		{
			alert(e);
		}
	},
	doSelect: function(sender, year, month, day){
		if (month < 10)
			month = "0"+month;
		this.ed_period.setText(year.toString()+month);
	},
	doEditChange: function(sender){
		if (sender == this.ed_period)
		{
			this.ed_nb.setText("");
			//if ((this.ed_period.getText() != "") && (this.ed_period.getText() != "")) this.bGen.click();
		}
	},
	sg1ondblclick: function(sender, col , row){
		this.sg2.clearAll();
		if (this.sg1.getCell(0,row) != "") 
		{		
			if (this.app._dbEng == "mysqlt")
			{
				var temp = this.dbLib.runSQL("select a.kode_akun,c.nama as nama_akun,a.kode_brg,b.nama as nama_brg,a.kode_sat,a.jumlah,a.nilai,(a.nilai * a.jumlah) as total "+
							     "from doc_po_d a inner join barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
							     "            inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
											 "where a.no_po = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.status = '1'");
			}				
			if (temp instanceof portalui_arrayMap){
				this.sg2.setData(temp);
			}else alert(rs);
		}
	},
	FindBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_pembuat) 
			{   
			    this.standarLib.showListData(this, "Daftar Petugas Verifikasi",this.cb_pembuat,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
											  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
			}
		
			if (sender == this.cb_setuju) 
			{   
			    this.standarLib.showListData(this, "Daftar Karyawan yang Menyetujui",this.cb_setuju,undefined, 
											  "select nik, nama from karyawan  where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
			}
		}catch(e){
			alert(e);
		}
	},
	doRequestReady : function(sender, methodName, result){
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
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else system.info(this,result,"");
				break;
									
					case "listData" :
						this.sg1.clear();
						if ((result != "") && (result != undefined))
						{
							this.list = this.standarLib.strToArray(result);				
							var values = undefined;								
							var value = Array();
							this.sg1.showLoading();
							for (var i in this.list.objList)
							{
								values = this.list.get(i);				
								for (var i in values.objList)
									value[i] = values.get(i);
								value[0] = value[0].toUpperCase();

								var dt=value[5].split(" ");
								var tgl=dt[0].split("-");
								value[5]=tgl[2]+"/"+tgl[1]+"/"+tgl[0];
								
								var dt=value[6].split(" ");
								var tgl=dt[0].split("-");
								value[6]=tgl[2]+"/"+tgl[1]+"/"+tgl[0];
								this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8,9,10,11),value);	
							}			
							this.sg1.hideLoading();
						}else if ((result!= undefined) && (result.toLowerCase().search("error") != -1))
					{
					  system.alert(this,result);
					}else 
					{ 
							system.info(this,"Data tidak ditemukan.","");
							this.sg1.appendRow();
							return false;
					}  
					break;
			}
			
			}
			catch(e)
			{
				alert("step : "+step+"; error = "+e);
			}
	    }
	}
});