window.app_portal_transaksi_fMessage = function(owner)
{
  if (owner)
	{
		window.app_portal_transaksi_fMessage.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_transaksi_fMessage";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Message Board", 7);	
		this.maximize();		
		
		this.tvMenu = new portalui_treeView(this);
		this.tvMenu.setLeft(5);
		this.tvMenu.setTop(0);
		this.tvMenu.setWidth(150);
		this.tvMenu.setHeight(this.getHeight());
		this.tvMenu.childLength = 130;
		this.tvMenu.onDblClick.set(this, "treeClick");		
		var node = new portalui_treeNode(this.tvMenu);
		node.setKodeForm("NM");
		node.setKode("-");
		node.setCaption("New Message");
		
		node = new portalui_treeNode(this.tvMenu);		
		node.setKodeForm("IB");
		node.setKode("-");
		node.setCaption("Inbox");
		
		node = new portalui_treeNode(this.tvMenu);
		node.setKodeForm("OB");
		node.setKode("-");
		node.setCaption("Outbox");
		
		this.pNm = new portalui_panel(this);
		this.pNm.setLeft(155);
		this.pNm.setTop(0);
		this.pNm.setWidth(this.width - 160);
		this.pNm.setHeight(this.height);
		uses("portalui_saiCBBL",true);
		this.eTo = new portalui_saiCBBL(this.pNm);
		this.eTo.setTop(10);
		this.eTo.setLeft(20);
		this.eTo.setWidth(400);
		this.eTo.setCaption("Kepada");
		this.eTo.onBtnClick.set(this,"FindBtnClick");
		
		this.eSubyek = new portalui_saiLabelEdit(this.pNm);
		this.eSubyek.setTop(35);
		this.eSubyek.setLeft(20);
		this.eSubyek.setWidth(400);
		this.eSubyek.setCaption("Subyek");
		
		this.eAttach = new portalui_saiCBBL(this.pNm);
		this.eAttach.setTop(60);
		this.eAttach.setLeft(20);
		this.eAttach.setWidth(400);
		this.eAttach.setCaption("Attachment");
		this.eAttach.setReadOnly(true);
		this.eAttach.onBtnClick.set(this,"FindBtnClick");
		
		uses("portalui_uploader",true);
		this.uploader = new portalui_uploader(this.pNm);
		this.uploader.setTop(60);
		this.uploader.setLeft(420);
		this.uploader.setWidth(80);
		this.uploader.onChange.set(this,"doUploadChange");
		this.uploader.hide();
		
		uses("portalui_saiMemo");
		this.mBody = new portalui_saiMemo(this.pNm);
		this.mBody.setLeft(20);
		this.mBody.setTop(85);
		this.mBody.setWidth(this.pNm.width - 40);
		this.mBody.setHeight(this.pNm.height - 100);
		this.mBody.setCaption("Isi Pesan");
		
		this.pBox = new portalui_panel(this);
		this.pBox.setLeft(155); 
		this.pBox.setTop(0);
		this.pBox.setWidth(this.width - 160);
		this.pBox.setHeight(this.height);
		this.pBox.hide();
		
		uses("portalui_saiSimpleTable",true);
		this.ib = new portalui_saiSimpleTable(this.pBox);
		this.ib.setTop(50);
		this.ib.setLeft(10);
		this.ib.setWidth(this.pBox.width - 40);
		this.ib.setHeight(this.height - 60);
		this.ib.setTitle(new Array("Del","Dari","Subyek","Tanggal","File"), new Array(50, 150, 350, 100, 150));
		
		setTipeButton(tbSimpan);		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.ib.appendData(new Array("<input type='checkbox'/>","testing","ssaya",(new Date).getDate(),""));
		}catch(e)
		{
			alert("[app_portal_transaksi_fMessage]->constructor : "+e);
		}
	}
};
window.app_portal_transaksi_fMessage.extend(window.portalui_childForm);
window.app_portal_transaksi_fMessage.prototype.doAfterResize = function(width, height)
{	
	if (this.pNm){
		this.pNm.setHeight(height);
		this.pNm.setWidth(width - 160);
		this.tvMenu.setHeight(height);
		this.mBody.setHeight(height - 100);
		this.mBody.setWidth(this.pNm.width - 40);
	}
};
window.app_portal_transaksi_fMessage.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}
	if (sender == this.app._mainForm.bSimpan)
	{
		system.confirm(this, "simpan", "Apa data sudah benar?","data di form ini apa sudah benar.");
	}
	if (sender == this.app._mainForm.bEdit)
	{
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data di form ini akan disimpan.");
	}
	if (sender == this.app._mainForm.bHapus)
	{
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	}
};
window.app_portal_transaksi_fMessage.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.e0);				
			}
		break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0"))))
			{
				try
				{
					uses("server_util_arrayList",true);
					sql = new server_util_arrayList();
					sql.add("insert into portal_info (kode_info, judul, tanggal, keterangan, nik_user, tgl_input, kode_file, no_dok_file) values  "+
							"('"+this.e0.getText()+"','"+this.e1.getText()+"','"+this.dp_Tgl.getDateString()+"','"+this.eKeterangan.getText()+"','"+this.app._userLog+"','"+(new Date).getDateStr()+"','"+this.eFile.getText()+"','"+this.eDokFile.getText()+"') ");
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		break;
		case "ubah" :
			if (modalResult == mrOk)
			{				
					uses("server_util_arrayList",true);					
					var sql = new server_util_arrayList();
					sql.add("update portal_info set  "+
							"	judul = '"+this.e1.getText()+"', "+
							" 	tanggal = '"+this.dp_Tgl.getDateString()+"', "+	
							"	keterangan = '"+this.eKeterangan.getText()+"', "+
							"   kode_file = '"+this.eFile.getText()+"', "+
							" 	no_dok_file = '"+this.eDokFile.getText()+"' "+
							"	where kode_info = '"+this.e0.getText()+"' ");
					this.dbLib.execArraySQL(sql);	
			}
		break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {			  
				  uses("server_util_arrayList",true);					
					var sql = new server_util_arrayList();
					sql.add("delete from portal_info where kode_info='"+this.e0.getText()+"'");
					this.dbLib.execArraySQL(sql);	
					this.standarLib.clearByTag(this, new Array("0"),this.e0);
		   }
		break;
	}
	this.e0.setFocus();
};
window.app_portal_transaksi_fMessage.prototype.keyPress = function(sender, charCode, buttonState )
{
};
window.app_portal_transaksi_fMessage.prototype.doEditChange = function(sender)
{
	if (this.e0.getText() != "")
	{
		try
		{
			setTipeButton(tbSimpan);
			var data = this.dbLib.runSQL("select kode_merk, nama from portal_merk where kode_merk = '"+this.e0.getText()+"'");
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){
					data = data.get(0);
					this.e1.setText(data.get("nama"));
					setTipeButton(tbUbahHapus);
				}
			}else throw(data);
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_portal_transaksi_fMessage.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.e0)
			this.standarLib.showListData(this, "Data Info",this.e0,this.e1, 
										  "select kode_info, judul from portal_info","select count(*) from portal_info",
										  ["kode_info","nama"],"where",["Kode","Nama"]);
		if (sender == this.eAttach)
			this.standarLib.showListData(this, "Data Dokumen File",sender,undefined, 
										  "select no_dok_file, nama from portal_dok_file","select count(*) from portal_dok_file",
										  ["no_dok_file","nama"],"where", ["No Dokumen File","Nama"]);
		if (sender == this.eTo)
			this.standarLib.showListData(this, "Data Karyawan",sender,undefined, 
										  "select nik, nama from karyawan","select count(*) from karyawan",
										  ["nik","nama"],"where", ["NIK","Nama"]);
	}catch(e)
	{
		alert(e);
	}
};
window.app_portal_transaksi_fMessage.prototype.doRequestReady = function(sender, methodName, result)
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
		              this.app._mainForm.pesan(2,"process completed ("+ this.e0.getText()+")");
		              this.app._mainForm.bClear.click();              
		            }else system.info(this,result,"");
    			break;
    		}
	    }catch(e)
	    {
	       alert("step : "+step+"; error = "+e);
	    }
	}
};
window.app_portal_transaksi_fMessage.prototype.treeClick = function(item)
{
	var kode = item.getKodeForm();
	switch (kode){
		case "NM" :
			this.pNm.show();
			this.pBox.hide();
			break;
		case "IB" :
			this.pBox.show();	
			this.pNm.hide();
			break;
		case "OB" :
			this.pBox.show();	
			this.pNm.hide();
			break;
	}
};
window.app_portal_transaksi_fMessage.prototype.doUploadChange = function(sender, filename, allow, data)
{	
	if (allow)
		this.eAttacg.setText(filename);
	else alert(data);
};