window.app_saku_sms_master_fDraft = function(owner)
{
	if (owner)
	{
		window.app_saku_sms_master_fDraft.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku_sms_master_fDraft";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Draft / SMS Template", 0);			
		this.maximize();
		
		uses("portalui_saiCBBL");
		this.id = new portalui_saiCBBL(this,{bound:[20,10,200,20], caption:"Kode",rightLabelVisible:false, change:[this, "doChange"], multiSelection:false});				
		this.bGen = new portalui_button(this,{bound:[250,10,100,20], caption:"Generate", click:"doClick"});			
		this.eNama = new portalui_saiLabelEdit(this,{bound:[20, 11, 700, 20], caption:"Deskripsi"});							
		this.rearrangeChild(10,23);
		this.setTabChildIndex();
		this.standar = new util_standar();	
		this.dbLib = new util_dbLib();
		setTipeButton(tbSimpan);
		this.id.setSQL("select kode_draft, nama from sms_draft where kode_lokasi ='"+this.app._lokasi+"' ",["kode_draft","nama"],false, ["Kode","Deskripsi"],"where","Draft SMS",false);
	}
};
window.app_saku_sms_master_fDraft.extend(window.portalui_childForm);

window.app_saku_sms_master_fDraft.implement({
	mainButtonClick:  function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","");	
	},
	doRequestReady: function(sender, methodName, result){
		switch (methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1)
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
					else this.app._mainForm.pesan(0, result); 
					break;
			}
	},
	doModalResult: function(event, modalResult, value){
		try
		{
			switch (event)
			{
				case "clear" :
					this.standar.clearByTag(this,[0],this.id);
				break;
				case "simpan" :
					if (modalResult == mrOk)
					{
						var sql = new server_util_arrayList();
						sql.add("insert into sms_draft(kode_draft, nama, keterangan,nik_user, kode_lokasi, tgl_input) "+
							"	values('"+this.id.getText()+"','"+this.eNama.getText()+"','-','"+this.app._nikUser+"','"+this.app._lokasi+"',now())");							
						this.dbLib.execArraySQL(sql);	
					}				
					break;
				case "ubah" :
					if (modalResult == mrOk)
					{
						var sql = new server_util_arrayList();
						sql.add("update sms_draft set  nama='"+this.eNama.getText()+"', tgl_input=now() "+
							"	"+
							"	where kode_lokasi = '"+this.app._lokasi+"' and kode_draft ='"+this.id.getText()+"' ");							
						this.dbLib.execArraySQL(sql);	
					}				
					break;
				case "hapus" :
					if (modalResult == mrOk)
					{
						var sql = new server_util_arrayList();
						sql.add("delete from sms_draft where kode_lokasi = '"+this.app._lokasi+"' and kode_draft ='"+this.id.getText()+"' ");							
						this.dbLib.execArraySQL(sql);	
					}
					break;
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doClick: function(sender){	
		try{
			this.id.setText(this.standar.noBuktiOtomatis(this.dbLib,"sms_draft", "kode_draft", "DR", "0000000",""));
			
		}catch(e){
			alert(e);
		}
	},
	findBtnClick: function(sender){	
		if (sender == this.id){
			this.standar.showListData(this, "Data Draft",sender,this.eNama, 
					  "select kode_draft, nama from sms_draft where kode_lokasi ='"+this.app._lokasi+"'",
					  "select count(*) from sms_draft where kode_lokasi ='"+this.app._lokasi+"' ",
					  ["kode_draft","nama"],"where",["Kode","Deskripsi"]);
		}
	},
	doChange: function(sender){	
		if (sender == this.id){	
			var data = this.dbLib.getDataProvider("select nama from sms_draft where kode_lokasi ='"+this.app._lokasi+"'",true);
			if (typeof data != "string") {
				if (data.rs.rows[0] !== undefined)
					this.eNama.setText(data.rs.rows[0].nama);
				else this.eNama.setText("");
			}
		}
	}
});