window.app_saku2_transaksi_kopeg_sju_fDraft = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_sju_fDraft.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_sju_fDraft";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Account Pemasaran", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;tinymceCtrl");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1});	
		this.cb_jenis = new saiCB(this,{bound:[20,12,200,20],caption:"Jenis", items:["QUOTATION","PLACING"]});
		this.cb_tipe = new portalui_saiCBBL(this,{bound:[20,13,202,20],caption:"COB",tag:2,multiSelection:false,change:[this,"doChange2"]});
		this.mDesk = new tinymceCtrl(this,{bound:[20,14,800,500], withForm:false});
		this.sg2 = new saiGrid(this,{bound:[830,10,350,475],colCount:2,tag:8,
					colTitle:["Kunci","Nama"], pasteEnable: true, 
					colWidth:[[1,0],[150,150]],					
					readnly:true,
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this,{bound:[830,10,350,25],buttonStyle:2,grid:this.sg2});	
		
		this.rearrangeChild(10, 23);
		this.sg2.setTop(this.mDesk.top);
		this.sgn2.setTop(this.sg2.top+475);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();	
			this.cb_tipe.setSQL("select kode_tipe, nama from sju_tipe where kode_lokasi='"+this.app._lokasi+"'",["kode_tipe","nama"],false,["Kode","Nama"],"and","Data Tipe",true);

			var data = this.dbLib.getDataProvider("select kunci,nama from sju_kunci order by kunci",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg2.appendData([line.kunci, line.nama]);
				}
			} else this.sg2.clear(1);									
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_sju_fDraft.extend(window.childForm);
window.app_saku2_transaksi_kopeg_sju_fDraft.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into sju_draft(no_draft,kode_lokasi,nama,keterangan,jenis,kode_tipe) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+urlencode(this.mDesk.getCode())+"','"+this.cb_jenis.getText()+"','"+this.cb_tipe.getText()+"')");
					
					
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update sju_draft set nama='"+this.e_nama.getText()+"',keterangan='"+urlencode(this.mDesk.getCode())+"',jenis='"+this.cb_jenis.getText()+"',kode_tipe='"+this.cb_tipe.getText()+"' "+
					        "where no_draft = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from sju_draft where no_draft = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
				setTipeButton(tbAllFalse);
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var strSQL = "select nama,keterangan,jenis,kode_tipe from sju_draft where no_draft ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";		
				var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[
						strSQL,
						"select kunci, nama, jenis from sju_draft_d where  no_draft ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by no_urut"
					]}),true);
				if (typeof data == "object"){
					var line = data.result[0].rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);		
						this.mDesk.setCode(urldecode(line.keterangan));
						this.cb_jenis.setText(line.jenis);
						this.cb_tipe.setText(line.kode_tipe);
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}					
				}
			}
		}catch(e){
			error_log(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Draft",sender,undefined, 
											  "select no_draft, nama  from sju_draft where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(no_draft) from sju_draft where kode_lokasi='"+this.app._lokasi+"'",
											  ["no_draft","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});