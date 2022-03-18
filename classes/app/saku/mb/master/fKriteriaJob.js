window.app_saku_mb_master_fKriteriaJob = function(owner)
{
	if (owner)
	{
		window.app_saku_mb_master_fKriteriaJob.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_mb_master_fKriteriaJob";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Kriteria Jabatan", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiTable");
		this.cb_kode = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Jabatan",btnClick:[this,"doBtnClick"],readOnly:true,rightLabelVisible:false});
		this.cb_kriteria = new portalui_saiCBBL(this,{bound:[20,11,200,20],caption:"Kriteria",btnClick:[this,"doBtnClick"],readOnly:true,rightLabelVisible:false});
		this.cb_kelas = new portalui_saiCBBL(this,{bound:[20,12,200,20],caption:"Kelas Gedung",btnClick:[this,"doBtnClick"],readOnly:true,rightLabelVisible:false});
		this.bLoad = new portalui_imageButton(this,{bound:[225,12,22,22],click:[this,"doLoadClick"],hint:"Search",image:"icon/"+system.getThemes()+"/reload.png"});		
		this.e_jml = new portalui_saiLabelEdit(this,{bound:[20,13,200,20],caption:"Value",maxLength:15,tipeText:ttNilai});		
		this.bTampil = new portalui_button(this,{bound:[629,13,80,18],caption:"Tampil",click:[this,"doTampilClick"]});	
		
		this.p1 = new portalui_panel(this);
		this.p1.setTop(14);
		this.p1.setWidth(700);
		this.p1.setLeft(10);
		this.p1.setHeight(415);
		this.p1.setCaption("Daftar Kriteria Jabatan");

		this.sg1 = new portalui_saiTable(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(695);
		this.sg1.setHeight(389);
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		try
		{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_mb_master_fKriteriaJob.extend(window.portalui_childForm);
window.app_saku_mb_master_fKriteriaJob.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1]))
			{
				try
				{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into mb_kriteria_job(kode_job,kode_kriteria,kode_indek,jumlah,kode_lokasi) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.cb_kriteria.getText()+"','"+this.cb_kelas.getText()+"',"+parseNilai(this.e_jml.getText())+",'"+this.app._lokasi+"')");
										
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1]))
			{
				try
				{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add(" update mb_kriteria_job set jumlah="+parseNilai(this.e_jml.getText())+" "+
						    " where kode_job = '"+this.cb_kode.getText()+"' and kode_kriteria='"+this.cb_kriteria.getText()+"' and kode_indek='"+this.cb_kelas.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0]))
			{
				try
				{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add(" delete from mb_kriteria_job "+
						    " where kode_job = '"+this.cb_kode.getText()+"' and kode_kriteria='"+this.cb_kriteria.getText()+"' and kode_indek='"+this.cb_kelas.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");										
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0"),this.cb_kode);															
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
	doLoadClick: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select jumlah from mb_kriteria_job "+
					       " where kode_job = '"+this.cb_kode.getText()+"' and kode_kriteria='"+this.cb_kriteria.getText()+"' and kode_indek='"+this.cb_kelas.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");										
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined)
					{
						this.e_jml.setText(floatToNilai(parseFloat(line.jumlah)));
						setTipeButton(tbUbahHapus);
					}
					else
					{
						setTipeButton(tbSimpan);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doTampilClick: function(sender){
		try{			
			if (this.cb_kelas.getText() != "")
			{
				this.sg1.setColTitle(new Array("No","Jabatan","Kriteria","Value"));				
				var data = this.dbLib.runSQL(" select b.nama as nama_job,c.nama as nama_kriteria, a.jumlah "+
						   " from mb_kriteria_job a inner join mb_job b on a.kode_job=b.kode_job and a.kode_lokasi=b.kode_lokasi "+
						   "                        inner join mb_kriteria c on a.kode_kriteria=c.kode_kriteria and a.kode_lokasi=c.kode_lokasi "+
						   " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_indek = '"+this.cb_kelas.getText()+"' ");
				this.sg1.clearAll();
				this.sg1.setData(data);
			}
			else {
				throw("Data Kelas harus diisi.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_kode) 
			{   
			    this.standarLib.showListData(this, "Daftar Jabatan",sender,undefined, 
											  "select kode_job, nama  from mb_job where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_job) from mb_job where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_job","nama"],"and",["Kode Jabatan","Nama"],false);				
			}
			if (sender == this.cb_kriteria) 
			{   
			        this.standarLib.showListData(this, "Daftar Kriteria",sender,undefined, 
											  "select kode_kriteria, nama  from mb_kriteria where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_kriteria) from mb_kriteria where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_kriteria","nama"],"and",["Kode","Nama"],false);				
			}
			if (sender == this.cb_kelas) 
			{   
			    this.standarLib.showListData(this, "Daftar Kelas",sender,undefined, 
											  "select kode_indek, nama  from mb_indek where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_indek) from mb_indek where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_indek","nama"],"and",["Kode Kelas","Nama"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
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
	}
});