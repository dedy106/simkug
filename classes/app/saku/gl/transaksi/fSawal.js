window.app_saku_gl_transaksi_fSawal = function(owner)
{
	if (owner)
	{
		window.app_saku_gl_transaksi_fSawal.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku_gl_transaksi_fSawal";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Setting Saldo Awal", 0);	
		
		this.maximize();
		uses("portalui_saiCBBL");				
		
		if (this.app._userStatus !="A")
		{
			//system.alert(this,"Anda tidak ada otoritas untuk mengakses form ini","Kontak administrator anda");
			//this.app._mainForm.bTutup.click();
		//	return false;
		}	
		this.eThn = new portalui_saiLabelEdit(this);
		this.eThn.setTop(10);
		this.eThn.setLeft(20);
		this.eThn.setWidth(150);		
		this.eThn.setCaption("Tahun");
		this.eThn.setReadOnly(true);
		
		uses("portalui_saiCBBL");
		this.eLokasi = new portalui_saiCBBL(this);
		this.eLokasi.setTop(32);
		this.eLokasi.setLeft(20);
		this.eLokasi.setWidth(150);
		this.eLokasi.setCaption("Lokasi");
		this.eLokasi.onBtnClick.set(this,"FindBtnClick");
		this.eLokasi.onExit.set(this,"doExit");
		
		this.btn = new portalui_button(this);
		this.btn.setTop(54);
		this.btn.setLeft(20);
		this.btn.setCaption("Load Akun");
		this.btn.onClick.set(this,"doClick");
		
		this.eNilai = new portalui_saiLabelEdit(this);
		this.eNilai.setTop(54);
		this.eNilai.setLeft(270);
		this.eNilai.setWidth(250);		
		this.eNilai.setTipeText(ttNilai);
		this.eNilai.setCaption("Saldo Akhir");		
		this.eNilai.setReadOnly(true);
		
		this.p1 = new portalui_panel(this);
		this.p1.setTop(76);
		this.p1.setLeft(20);
		this.p1.setWidth(500);
		this.p1.setHeight(380);
		this.p1.setCaption("Data Table");
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(25);
		this.sg1.setLeft(0);
		this.sg1.setHeight(345);
		this.sg1.setWidth(500);
		this.sg1.setColCount(3);
		this.sg1.setColTitle(new Array("Kode Akun","Nama Akun","Saldo"));
		this.sg1.setColWidth(new Array(0,1,2),new Array(80,250,120));
		this.sg1.columns.get(2).setColumnFormat(cfNilai);
		this.sg1.columns.get(0).setReadOnly(true);
		this.sg1.columns.get(1).setReadOnly(true);
						
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.menuStr = "";
		
		uses("util_standar");
		this.standarLib = new util_standar();
		
		setTipeButton(tbSimpan);				
		
		this.rowIndex = -1;
		this.setTabChildIndex();
		this.standarLib.clearByTag(this, new Array("0"), this.e0);		
		this.eThn.setText(this.app._periode.substr(0,4));
		this.eLokasi.setText(this.app._lokasi);
		this.sg1.onChange.set(this,"doSGChange");
		this.sg1.onNilaiChange.set(this,"doNilaiChange");
	}
};
window.app_saku_gl_transaksi_fSawal.extend(window.portalui_childForm);
window.app_saku_gl_transaksi_fSawal.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
		system.confirm(this, "clear", "screen akan dibersihkan?","");	
	if (sender == this.app._mainForm.bSimpan){
		if (nilaiToFloat(this.eNilai.getText()) > 0)
		{
			system.alert(this,"Saldo Akhir harus sama dengan 0(nol)","");
			return false;
		}
		system.confirm(this, "simpan", "Apa data sudah benar?","");
	}
	if (sender == this.app._mainForm.bEdit)
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","");	
	if (sender == this.app._mainForm.bHapus)
		system.confirm(this, "hapus", "Yakin data akan dihapus?","");	
};
window.app_saku_gl_transaksi_fSawal.prototype.doClick = function(sender)
{
	this.masakun = this.dbLib.runSQL("select a.kode_akun, a.nama, ifnull(b.so_akhir,0) as so_akhir from masakun a "+
		"left join glma b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi and b.periode = '"+this.eThn.getText()+"01'"+
		"where a.kode_lokasi = '"+this.eLokasi.getText()+"' and a.jenis='Neraca' order by a.kode_akun");		
	this.sg1.clear();
	if (this.masakun instanceof portalui_arrayMap){
		for (var i in this.masakun.objList){			
			this.sg1.appendData(new Array(this.masakun.get(i).get("kode_akun"),this.masakun.get(i).get("nama"),floatToNilai(parseFloat(this.masakun.get(i).get("so_akhir")))));
		}
		this.sg1.validasi();
	}else system.alert(this, this.masakun,"");			
	
};
window.app_saku_gl_transaksi_fSawal.prototype.FindBtnClick = function(sender)
{
	if (this.app._userStatus=="A")
	{
		this.standarLib.showListData(this, "Data Lokasi",sender,undefined, 
										  "select kode_lokasi, nama from lokasi ","select count(*) from lokasi",
										  ["kode_lokasi","nama"],"and",["Kode Lokasi","Nama Lokasi"]);
	}
	else
	{
		this.standarLib.showListData(this, "Data Lokasi",sender,undefined, 
										  "select kode_lokasi, nama from lokasi where kode_lokasi='"+this.app._lokasi+"'","select count(*) from lokasi where kode_lokasi='"+this.app._lokasi+"'",
										  ["kode_lokasi","nama"],"and",["Kode Lokasi","Nama Lokasi"]);

	}
};
window.app_saku_gl_transaksi_fSawal.prototype.doRequestReady = function(sender, methodName, result)
{

	switch (methodName)
		{			
			case "execArraySQL" :
				if (result.toLowerCase().search("error") == -1){
					this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
					this.app._mainForm.bClear.click();
				}else this.app._mainForm.pesan(0, result); 
				break;
		}
};
window.app_saku_gl_transaksi_fSawal.prototype.doModalResult = function(event, modalResult, value)
{
	try
	{
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.e0.clear();
				}
				break;
			case "simpan" :
				if (modalResult == mrOk)
				{
					try{
						var script = "";
						var first = true; 
						sql = new server_util_arrayList();
						sql.add("delete from glma where kode_lokasi='"+this.eLokasi.getText()+"'");						
						for (var i in this.sg1.rows.objList){															
							script = "insert into glma(kode_akun,kode_lokasi,periode,so_akhir,tgl_input,nik_user) "+
							         "values('"+this.sg1.cells(0,i)+"','"+this.eLokasi.getText()+"', '"+this.eThn.getText()+"01',"+parseNilai(this.sg1.cells(2,i))+",now(),'"+this.app._userLog+"')";
							sql.add(script);		
						}	
						this.dbLib.execArraySQL(sql);
					}
					catch(e)
					{
						system.alert(e);
					}
	
	
				}
				break;
			
		}
	}catch(e){
		alert("[fNeraca]::doModalResult:"+e);
	}
};
window.app_saku_gl_transaksi_fSawal.prototype.doSGChange = function(sender, col, row)
{
	if (col == 2){
		this.sg1.validasi();
	}	
};
window.app_saku_gl_transaksi_fSawal.prototype.doNilaiChange = function(sender)
{
	var total = 0;
	for (var i=0; i < this.sg1.getRowCount();i++){
		total += nilaiToFloat(this.sg1.cells(2,i));
	}
	this.eNilai.setText(floatToNilai(parseFloat(total)));
};
