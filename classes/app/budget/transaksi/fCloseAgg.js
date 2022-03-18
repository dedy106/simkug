window.app_saku_anggaran_transaksi_fCloseAgg = function(owner)
{
	if (owner)
	{
		window.app_saku_anggaran_transaksi_fCloseAgg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_anggaran_transaksi_fCloseAgg";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Closing Anggaran Original c: Input", 0);	
		
		uses("portalui_saiLabelEdit");
		this.ed_period = new portalui_saiLabelEdit(this);
		this.ed_period.setTop(10);
		this.ed_period.setLeft(20);
		this.ed_period.setWidth(182);
		this.ed_period.setCaption("Tahun Anggaran");
		this.ed_period.setText(""); 
		this.ed_period.setReadOnly(true);
		this.ed_period.setTag("9");
		
		this.lblTgl1 = new portalui_label(this);
		this.lblTgl1.setTop(32);
		this.lblTgl1.setLeft(20);
		this.lblTgl1.setWidth(101);		
		this.lblTgl1.setHeight(20);		
		this.lblTgl1.setCaption("Tanggal Transaksi");
		this.lblTgl1.setUnderLine(true);
		
		uses("portalui_datePicker");	
		this.dp_tgl1 = new portalui_datePicker(this);
		this.dp_tgl1.setTop(34);
		this.dp_tgl1.setLeft(120);
		this.dp_tgl1.setWidth(82);
	
        this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(56);
		this.ed_nb.setWidth(220);
		this.ed_nb.setCaption("No Closing");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
		
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(246);
		this.bGen.setTop(56);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
	    
		uses("portalui_imageButton");
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(520);
		this.bShow.setTop(144);
		this.bShow.setHint("Tampil Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_dok = new portalui_saiLabelEdit(this);
		this.ed_dok.setLeft(20);
		this.ed_dok.setTop(78);
		this.ed_dok.setWidth(320);
		this.ed_dok.setCaption("No Dokumen");
		this.ed_dok.setText(""); 
		this.ed_dok.setReadOnly(false);
		this.ed_dok.setLength(50);
		
		this.ed_desc = new portalui_saiLabelEdit(this);
		this.ed_desc.setLeft(20);
		this.ed_desc.setTop(100);
		this.ed_desc.setWidth(500);
		this.ed_desc.setCaption("Deskripsi");
		this.ed_desc.setText(""); 
		this.ed_desc.setReadOnly(false);
		this.ed_desc.setLength(150);
		
		uses("portalui_saiCBBL");
		this.cb_pembuat = new portalui_saiCBBL(this);
		this.cb_pembuat.setLeft(20);
		this.cb_pembuat.setTop(122);
		this.cb_pembuat.setWidth(185);
		this.cb_pembuat.setLabelWidth(100);
		this.cb_pembuat.setReadOnly(true);
		this.cb_pembuat.setRightLabelVisible(true);
		this.cb_pembuat.setCaption("Diclosing Oleh");
		this.cb_pembuat.setText(""); 
		this.cb_pembuat.setRightLabelCaption(" ");
		
		this.cb_setuju = new portalui_saiCBBL(this);
		this.cb_setuju.setLeft(20);
		this.cb_setuju.setTop(144);
		this.cb_setuju.setWidth(185);
		this.cb_setuju.setLabelWidth(100);
		this.cb_setuju.setReadOnly(true);
		this.cb_setuju.setRightLabelVisible(true);
		this.cb_setuju.setCaption("Disetujui Oleh");
		this.cb_setuju.setText(""); 
		this.cb_setuju.setRightLabelCaption(" ");
		
		this.bPAll = new portalui_button(this);
		this.bPAll.setLeft(546);
		this.bPAll.setTop(144);
		this.bPAll.setCaption("Close All");
		
		this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(166);
	    this.p1.setWidth(900);
	    this.p1.setHeight(310);
	    this.p1.setName('p1');
	    this.p1.setCaption('Daftar Dokumen Transaksi Belum Closing');
	    
		uses("portalui_saiGrid");
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
		this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(145);
		this.sg1.setColCount(9);
		this.sg1.setColTitle(new Array("Status","No Bukti","No Dokumen","Tgl Dok.","Deskripsi","Currency","NIK Pembuat","NIK App","Total Nilai"));
		this.sg1.setColWidth(new Array(8,7,6,5,4,3,2,1,0),new Array(100,70,70,60,200,80,100,100,80));			
		this.sg1.setReadOnly(false);    
		this.sg1.columns.get(0).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
		    val.set(1, "CLOSING");
			val.set(2, "INPROG");
		this.sg1.columns.get(0).setPicklist(val);		   			
    	this.sg1.columns.get(1).setReadOnly(true);
    	this.sg1.columns.get(2).setReadOnly(true);
    	this.sg1.columns.get(3).setReadOnly(true);
    	this.sg1.columns.get(4).setReadOnly(true);
    	this.sg1.columns.get(5).setReadOnly(true);	
    	this.sg1.columns.get(6).setReadOnly(true);
    	this.sg1.columns.get(7).setReadOnly(true);
		this.sg1.columns.get(8).setColumnFormat(window.cfNilai);
    	this.sg1.columns.get(8).setReadOnly(true);
		
		uses("portalui_saiTable");	
		this.sg2 = new portalui_saiTable(this.p1);
    	this.sg2.setLeft(1);
		this.sg2.setTop(170);
    	this.sg2.setWidth(895);
    	this.sg2.setHeight(135);
		this.sg2.setTag("2");
		this.sg2.setColTitle(new Array("No","Kode Akun","Nama Akun","Kode Dept","Nama Dept","Kode RKM","Nama RKM","DC","Periode","Volume","Satuan","Nilai Satuan","Sub Total"));

		uses("portalui_sgNavigator");
		this.sgNav =  new portalui_sgNavigator(this);
		this.sgNav.setTop(140);
		this.sgNav.setLeft(623);
		this.sgNav.setWidth(297);
		this.sgNav.setGrid(this.sg);
		this.sgNav.setBorder(0);
		this.sgNav.setButtonStyle(3);
		
		this.lblLast = new portalui_label(this);
		this.lblLast.setTop(990);
		this.lblLast.setCaption("");
		
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    uses("util_standar;util_gridLib;util_addOnLib");
		    this.standarLib = new util_standar();
			this.gridLib=new util_gridLib();
			this.addOnLib=new util_addOnLib();
			
			this.ed_period.onChange.set(this, "doEditChange");
			this.bGen.onClick.set(this, "genClick");
			this.cb_pembuat.onChange.set(this, "doEditChange");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onChange.set(this, "doEditChange");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			
			this.bShow.onClick.set(this, "showClick");
			this.bPAll.onClick.set(this, "pAllClick");
			this.sg1.onDblClick.set(this,"sg1ondblclick");
			this.sgNav.onPager.set(this, "doSelectedPage");
			
			this.standarLib.clearByTag(this, new Array("0","1","2"),this.dp_tgl1);				
			this.ed_period.setText(this.app._periode.substr(0,4));
			this.sg1.clear(); this.sg1.appendRow();
			this.baris = this.app._baris;
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_anggaran_transaksi_fCloseAgg.extend(window.portalui_childForm);
window.app_saku_anggaran_transaksi_fCloseAgg.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}
	if (sender == this.app._mainForm.bSimpan)
	{
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");
	}
	if (sender == this.app._mainForm.bEdit)
	{
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
	}
	if (sender == this.app._mainForm.bHapus)
	{
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	}
};
window.app_saku_anggaran_transaksi_fCloseAgg.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				try
				{
					this.standarLib.clearByTag(this, new Array("0","1","2"),undefined);				
					this.sg1.clear(); this.sg1.appendRow();
					this.sg2.clearAll();
				} catch(e)			
				{
					system.alert(this, e,"");
				}
			}
		break;
		case "simpan" :
			try
			{	
				var line,data = this.dbLib.runSQL(" select tahun "+
												  " from closeagg_m "+
												  " where tahun ='"+this.ed_period.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (data instanceof portalui_arrayMap)
				{
					if (data.get(0) != undefined)
					{									
						system.alert(this,"Anggaran Original Tahun "+this.ed_period.getText()+" sudah diclose.","Lakukan perubahan anggaran dimenu lainnya.");
						return false;
					} 
				}
				var cekData = "F";
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{
					if (this.sg1.getCell(0,i) == "CLOSING") 
					cekData = "T";
				}
				if (cekData == "F")
				{
					system.alert(this,"Tidak ada data anggaran yang siap diclosing.","Pilih CLOSING untuk mem-closing data anggaran di kolom status.");
					return false;
				}
			} catch(e)
			{
				system.alert(this, e,"");
			}
			
			this.bGen.click();
			if (modalResult == mrOk && (this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
			{
				try
				{
					var tgl = new Date();
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
				
					sql.add("insert into closeagg_m (no_close,no_dokumen,kode_lokasi,keterangan,tanggal,tahun,nik_buat,nik_app,nik_user,tgl_input) values "+
							"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.app._lokasi+"','"+this.ed_desc.getText()+"','"+this.dp_tgl1.getDate()+"','"+
							this.ed_period.getText()+"','"+this.cb_pembuat.getText()+"','"+this.cb_setuju.getText()+
							"','"+this.app._userLog+"',now())");
															
					for (var i=0; i < this.sg1.rows.getLength(); i++)
					{
						if (this.sg1.getCell(0,i) == "CLOSING")
						{
							sql.add("insert into closeagg_d (no_close,no_bukti,status,catatan,no_del,kode_lokasi) values "+
								    "('"+this.ed_nb.getText()+"','"+this.sg1.getCell(1,i)+"','"+this.sg1.getCell(0,i)+"','-','-','"+this.app._lokasi+"')");
							sql.add("call sp_closeagg ('"+this.sg1.getCell(1,i)+"','"+this.app._lokasi+"','"+this.ed_period.getText()+"')");							
						}
					}					
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
			break;
	}
};
window.app_saku_anggaran_transaksi_fCloseAgg.prototype.genClick = function(sender)
{
	try
	{
		if (this.ed_period.getText() != "")
		{
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'closeagg_m','no_close',this.app._lokasi+"-CLAG"+this.ed_period.getText()+".",'0000'));
			//this.ed_desc.setFocus();
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
};
window.app_saku_anggaran_transaksi_fCloseAgg.prototype.pAllClick = function(sender)
{
	for (var i=0; i < this.sg1.rows.getLength(); i++)
	{
		this.sg1.setCell(0,i,"CLOSING");
	}
};
window.app_saku_anggaran_transaksi_fCloseAgg.prototype.doSelectedPage = function(sender, page)
{
	try
	{
		this.dbLib.listData(this.scriptSql, page, this.baris);
	} catch(e)
	{
		system.alert(this, e,"");
	}
};
window.app_saku_anggaran_transaksi_fCloseAgg.prototype.showClick = function(sender)
{
	try
	{
		this.sg1.clear();
		this.sg1.appendRow();
		var pageCount = this.dbLib.getRowCount("select count(a.no_agg) "+
											   "from anggsusun_m a "+
											   "where a.jenis = 'ORGI' and a.posted = 'F' and a.tahun='"+this.ed_period.getText()+
											   "' and a.kode_lokasi='"+this.app._lokasi+"'", this.baris);		
		this.scriptSql = " select 'INPROG' as status,a.no_agg,a.no_dokumen,a.tanggal,a.keterangan,a.kode_curr,b.nama as nama_buat,c.nama as nama_setuju,a.nilai "+
							 " from anggsusun_m a inner join karyawan b on a.nik_buat = b.nik and a.kode_lokasi=b.kode_lokasi "+
							 "                   inner join karyawan c on a.nik_setuju = c.nik and a.kode_lokasi=c.kode_lokasi "+
							 " where a.jenis='ORGI' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted='F' and a.tahun='"+this.ed_period.getText()+"'";		
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
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_anggaran_transaksi_fCloseAgg.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_period)
	{
		this.ed_nb.setText("");
	}
};												  
window.app_saku_anggaran_transaksi_fCloseAgg.prototype.sg1ondblclick = function(sender, col , row)
{
	this.sg2.clearAll();
	if (this.sg1.getCell(0,row) != "") 
	{	
		var temp = this.dbLib.runSQL(" select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_drk,d.nama as nama_drk,a.dc,substring(a.periode,5,2) as periode,a.volume,a.satuan,a.nilai_sat,a.nilai "+
			                             " from anggsusun_d a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
										 "					 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
										 "					 inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4) = d.tahun"+
										 " where a.no_agg = '"+this.sg1.getCell(1,this.sg1.row)+"'");		
		if (temp instanceof portalui_arrayMap)
		{
			this.sg2.setData(temp);
		}else alert(rs);
	}
};
window.app_saku_anggaran_transaksi_fCloseAgg.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_pembuat) 
		{   
		    this.standarLib.showListData(this, "Daftar Petugas Closing Pengajuan Anggaran",this.cb_pembuat,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
		}
		if (sender == this.cb_setuju)
		{   
		    this.standarLib.showListData(this, "Daftar Karyawan yang Menyetujui",this.cb_setuju,undefined, 
										  "select nik, nama  from karyawan  where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan  where kode_lokasi='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
		}
	}
	catch(e)
	{
		alert(e);
	}
};
window.app_saku_anggaran_transaksi_fCloseAgg.prototype.doRequestReady = function(sender, methodName, result)
{
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
							value[1] = value[1].toUpperCase();
							
							var dt=value[3].split(" ");
							var tgl=dt[0].split("-");
							value[3]=tgl[2]+"/"+tgl[1]+"/"+tgl[0];
							this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6,7,8),value);	
						}	
						this.sg1.hideLoading();	
						//if need empty value						
					}else if ((result!= undefined) && (result.toLowerCase().search("error") != -1))
			        {
			          system.alert(this,result);
			        }else 
			        { 
						system.info(this,"Data tidak ditemukan.","Tidak ada data anggaran yang siap closing.");
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
};