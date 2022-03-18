window.app_saku_sms_master_fKeyword = function(owner)
{
	if (owner)
	{
		window.app_saku_sms_master_fKeyword.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku_sms_master_fKeyword";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Parameter Kata Kunci", 0);	
		
		this.maximize();
		
		uses("portalui_saiCBBL");
		this.id = new portalui_saiCBBL(this,{bound:[20,10,200,20], caption:"ID", rightLabelVisible:false, change:[this,"doChange"], multiSelection:false});		
		this.bGen = new portalui_button(this,{bound:[20,11,100,20], caption:"Generate", click:[this, "doClick"]});
		this.eNama = new portalui_saiLabelEdit(this,{bound:[20,12,700, 20], caption:"Deskripsi"});					
		this.eReply = new portalui_saiLabelEdit(this,{bound:[20, 13, 700, 20], caption:"Default Reply"});				
		this.eSQL = new portalui_saiLabelEdit(this,{bound:[20, 14, 700, 20], allowQuote:true, caption:"Data Provider(SQL)"  });				
		this.eSQL2 = new portalui_saiLabelEdit(this, {bound:[20, 15, 700, 20], allowQoute:true, caption:"Command"});									
		
		this.rearrangeChild(10,23);
		this.setTabChildIndex();
		this.standar = new util_standar();	
		this.dbLib = new util_dbLib();
		setTipeButton(tbSimpan);
		this.id.setSQL("select kode_kunci, nama from sms_kunci",["kode_kunci","nama"],false, ["Kode","Deskripsi"],"where","Daftar Keyword",false);
	}
};
window.app_saku_sms_master_fKeyword.extend(window.portalui_childForm);
window.app_saku_sms_master_fKeyword.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","");	
	},
	doRequestReady : function(sender, methodName, result){
		switch (methodName){
			case "runQuery" : 																			
				this.loadMenu(result);
				break;
			case "execArraySQL" :
				if (result.toLowerCase().search("error") == -1){
					this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.id.getText()+")");
					this.app._mainForm.bClear.click();
				}else this.app._mainForm.pesan(0, result); 
				break;
		}
	},
	doModalResult: function(event, modalResult, value){
		try
		{
			switch (event)
			{
				case "clear" :
					if (modalResult == mrOk)
					{
						this.standar.clearByTag(this,[0],this.id);
					}
					break;
				case "simpan" :
					if (modalResult == mrOk)
					{					
						var sql = new server_util_arrayList();					
						var sqlt = this.eSQL.getText();
						sqlt = sqlt.replace(/\\/g,'');	
						sqlt = sqlt.replace(/'/g,"\\'");						
						var sqlt2 = this.eSQL2.getText();
						sqlt2 = sqlt2.replace(/\\/g,'');	
						sqlt2 = sqlt2.replace(/'/g,"\\'");						
						sql.add("insert into sms_kunci(kode_kunci, nama, replytext, sqltext, addsql,kode_folder, kode_lokasi) "+
							"	values('"+this.id.getText()+"','"+this.eNama.getText()+"','"+this.eReply.getText()+"','"+sqlt+"','"+sqlt2+"','-','"+this.app._lokasi+"')");							
						this.dbLib.execArraySQL(sql);	
					}				
					break;
				case "ubah" :
					if (modalResult == mrOk)
					{					
						var sqlt = this.eSQL.getText();					
						sqlt = sqlt.replace(/\\/g,'');						
						sqlt = sqlt.replace(/'/g,"\\'");						
						var sqlt2 = this.eSQL2.getText();
						sqlt2 = sqlt2.replace(/\\/g,'');	
						sqlt2 = sqlt2.replace(/'/g,"\\'");						
						var sql = new server_util_arrayList();
						sql.add("update sms_kunci set  nama='"+this.eNama.getText()+"', replytext='"+this.eReply.getText()+"' "+
							"	, sqltext='"+sqlt+"', addsql='"+sqlt2+"', kode_folder='-' "+
							"	where kode_lokasi = '"+this.app._lokasi+"' and kode_kunci ='"+this.id.getText()+"' ");							
						this.dbLib.execArraySQL(sql);	
					}				
					break;
				case "hapus" :
					if (modalResult == mrOk)
					{
						var sql = new server_util_arrayList();
						sql.add("delete from sms_kunci where kode_lokasi = '"+this.app._lokasi+"' and kode_kunci ='"+this.id.getText()+"' ");							
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
			this.id.setText(this.standar.noBuktiOtomatis(this.dbLib,"sms_kunci", "kode_kunci", "KW", "00000",""));
		}catch(e){
			alert(e);
		}
	},
	findBtnClick: function(sender){	
		if (sender == this.id){
			this.standar.showListData(this, "Data Parameter Kunci",sender,undefined, 
					  "select kode_kunci, nama from sms_kunci ","select count(*) from sms_kunci",
					  ["kode_kunci","nama"],"where",["Kode","Deskripsi"]);
		}		
	},
	doChange: function(sender){	
		try {
			if (sender == this.id) {
				var rs = this.dbLib.getDataProvider("select a.nama, a.replytext, a.sqltext, a.addsql " +
				"	from sms_kunci a  where kode_kunci = '" +sender.getText() +"' ");
				rs = JSON.parse(rs);
				if (rs.rs.rows.length > 0) {
					setTipeButton(tbUbahHapus);
					this.eNama.setText(rs.rs.rows[0].nama);
					this.eReply.setText(rs.rs.rows[0].replytext);
					this.eSQL.setText(rs.rs.rows[0].sqltext);
					this.eSQL2.setText(rs.rs.rows[0].addsql);
				}
				else {
					setTipeButton(tbSimpan);
					this.eNama.setText("");
					this.eReply.setText("");
					this.eSQL.setText("");
					this.eSQL2.setText("");
				}
			}
		}catch(e){
			systemAPI.alert(e,rs);
		}
	}
});