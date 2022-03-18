window.app_saku3_transaksi_siaga_hris_karyawan_fCopy = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_karyawan_fCopy.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_karyawan_fCopy";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Copy Karyawan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator;checkBox");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,220,20],caption:"NIK Lama",maxLength:10,multiSelection:false,change:[this,"doChange"]});
		//this.e_nama = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:100});	

		this.cb_sdm = new saiCBBL(this,{bound:[20,15,220,20],caption:"Status SDM", multiSelection:false, maxLength:10, tag:1});
		this.l_tgl3 = new label(this,{bound:[20,29,100,18],caption:"Tanggal Masuk", underline:true});
		this.dp_d3 = new datePicker(this,{bound:[120,29,98,18],date:new Date().getDateStr()});	
		this.e_nik = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"NIK Baru", maxLength:20,readOnly:false});	
		this.i_gen2 = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate NIK",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});			
		
			
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_kode.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);				
			this.cb_sdm.setSQL("select sts_sdm, nama from gr_status_sdm where kode_lokasi='"+this.app._lokasi+"'",["sts_sdm","nama"],false,["Kode","Nama"],"and","Data Status SDM",true);						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_karyawan_fCopy.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_karyawan_fCopy.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var sql="call sp_gr_copy ('"+this.cb_kode.getText()+"','"+this.e_nik.getText()+"','"+this.app._lokasi+"','"+this.cb_sdm.getText()+"')";					
					this.dbLib.execQuerySync(sql);	
					
					system.info(this,"Data telah selesai tercopy.","")

					this.cb_sdm.setText("","");
					this.e_nik.setText("");
		
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
					this.standarLib.clearByTag(this, new Array("0"),this.cb_kode);
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
	doClick:function(sender){
		var AddFormat = "K"+this.dp_d3.getDateString().substr(2,2);
		var AddFormat2 = "G"+this.dp_d3.getDateString().substr(2,2);
		var AddFormat3 = "D"+this.dp_d3.getDateString().substr(2,2);
		if( this.cb_sdm.getText() == "9" ){
			var data = this.dbLib.getDataProvider("select isnull(max(nik),0) as nik from gr_karyawan where nik like '"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.nik == "0") this.cb_kode.setText(AddFormat+"0001");
					else {
						var idx = parseFloat(line.nik.substr(3,4)) + 1;
						idx = idx.toString();
						if (idx.length == 1) var nu = "000"+idx;
						if (idx.length == 2) var nu = "00"+idx;
						if (idx.length == 3) var nu = "0"+idx;
						if (idx.length == 4) var nu = idx;						
						this.e_nik.setText(AddFormat+nu);						
					}
				} 
			}
		} else {
			if(this.cb_sdm.getText() == "10")
				var data = this.dbLib.getDataProvider("select isnull(max(nik),0) as nik from gr_karyawan where nik like '"+AddFormat3+"%' and kode_lokasi='"+this.app._lokasi+"'",true);
			else var data = this.dbLib.getDataProvider("select isnull(max(nik),0) as nik from gr_karyawan where nik like '"+AddFormat2+"%' and kode_lokasi='"+this.app._lokasi+"'",true);
			
				
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if(this.cb_sdm.getText() == "1"){
						if (line.nik == "0") this.cb_kode.setText(AddFormat2+"001");
						else {
							var idx = parseFloat(line.nik.substr(3,3)) + 1;
							idx = idx.toString();
							if (idx.length == 1) var nu = "00"+idx;
							if (idx.length == 2) var nu = "0"+idx;
							if (idx.length == 3) var nu = idx;							
							this.e_nik.setText(AddFormat2+nu);					
						}
					}
					if(this.cb_sdm.getText() == "10"){
						if (line.nik == "0") this.cb_kode.setText(AddFormat3+"001");
						else {
							var idx = parseFloat(line.nik.substr(3,3)) + 1;
							idx = idx.toString();
							if (idx.length == 1) var nu = "00"+idx;
							if (idx.length == 2) var nu = "0"+idx;
							if (idx.length == 3) var nu = idx;							
							this.e_nik.setText(AddFormat3+nu);					
						}
					}
					if(this.cb_sdm.getText() == "4"){
						if (line.nik == "0") this.cb_kode.setText(AddFormat2+"001"+"K");
						else {
							var idx = parseFloat(line.nik.substr(3,3)) + 1;
							idx = idx.toString();
							if (idx.length == 1) var nu = "00"+idx;
							if (idx.length == 2) var nu = "0"+idx;
							if (idx.length == 3) var nu = idx;							
							this.e_nik.setText(AddFormat2+nu+"K");				
						}
					}
				} 
			}
		}
	},



	/*doChange: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select nama "+
				           " from gr_karyawan where nik ='"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						setTipeButton(tbSimpan);
					}
					else{
						setTipeButton(tbSimpan);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	*/
	doPager: function(sender, page) {
		this.sg1.selectPage(page);
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