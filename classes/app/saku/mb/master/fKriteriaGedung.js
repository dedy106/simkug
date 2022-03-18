window.app_saku_mb_master_fKriteriaGedung = function(owner)
{
	if (owner)
	{
		window.app_saku_mb_master_fKriteriaGedung.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_mb_master_fKriteriaGedung";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Kriteria Gedung", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid");
		this.cb_kode = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Gedung",btnClick:[this,"doBtnClick"],readOnly:true,rightLabelVisible:false});
		this.bLoad = new portalui_imageButton(this,{bound:[225,10,22,22],click:[this,"doLoadClick"],hint:"Search",image:"icon/"+system.getThemes()+"/reload.png"});		
		this.e_kelas = new portalui_saiLabelEdit(this,{bound:[20,11,180,20],caption:"Kelas",readOnly:true});		
		this.bTampil = new portalui_button(this,{bound:[529,11,80,18],caption:"Tampil",click:[this,"doTampilClick"]});	
		
		this.p1 = new portalui_panel(this,{bound:[10,12,600,415],caption:"Daftar Kriteria Gedung"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,695,389],colCount:3,colTitle:["Kode","Deskripsi","Value"],
					colWidth:[[0,1,2],[80,400,80]], colFormat:[[2],[cfNilai]],defaultRow:1,columnReadOnly:[true,[0,1],[2]]
					});		
					
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
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
window.app_saku_mb_master_fKriteriaGedung.extend(window.portalui_childForm);
window.app_saku_mb_master_fKriteriaGedung.implement({
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
		
					sql.add("delete from mb_kriteria_gedung where kode_gedung = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.sg1.getRowValidCount() > 0){
						var d="insert into mb_kriteria_gedung(kode_gedung,kode_kriteria,kode_indek,nilai,kode_lokasi)values ";
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								if (i > 0) d+= ",";
								d += "('"+this.cb_kode.getText()+"','"+this.sg1.cells(0,i)+"','"+this.e_kelas.getText()+"',"+parseNilai(this.sg1.cells(2,i))+",'"+this.app._lokasi+"')";
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0"),this.cb_kode);															
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
		}
	},
	doLoadClick: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select kelas from mb_gedung "+
					       " where kode_gedung = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");										
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined)
					{
						this.e_kelas.setText(line.kelas);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doTampilClick: function(sender){
		try{			
			if (this.e_kelas.getText() != ""){
				var data = this.dbLib.getDataProvider("select distinct a.kode_kriteria,a.nama,ifnull(b.nilai,0) as nilai "+
				                                      "from mb_kriteria a "+
													  "     inner join mb_kriteria_job c on a.kode_kriteria=c.kode_kriteria and a.kode_lokasi=c.kode_lokasi "+
													  "     left join mb_kriteria_gedung b on c.kode_kriteria=b.kode_kriteria  and c.kode_lokasi=b.kode_lokasi and b.kode_gedung = '"+this.cb_kode.getText()+"' "+
													  "where c.kode_indek='"+this.e_kelas.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.kode_kriteria,line.nama,floatToNilai(line.nilai)]);
					}
				}
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
			    this.standarLib.showListData(this, "Daftar Gedung",sender,undefined, 
											  "select kode_gedung, nama  from mb_gedung where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_gedung) from mb_gedung where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_gedung","nama"],"and",["Kode Gedung","Nama"],false);				
				this.e_kelas.setText("");
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