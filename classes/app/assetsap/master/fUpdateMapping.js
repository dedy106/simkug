/**
 * @author dweexfuad
 */
window.app_assetsap_master_fUpdateMapping = function(owner) {
	if (owner){
		window.app_assetsap_master_fUpdateMapping.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_master_fUpdateMapping";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Update Data Mapping Location ke Area", 0);	
		uses("datePicker;checkBox;app_assetsap_transaksi_fSvrUpload");						
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new saiLabelEdit(this,{bound:[20,2,220,20],caption:"No Update",readOnly:true});
		this.bGen = new button(this,{bound:[250,2,60,20],caption:"Generate",click:"doClick"});											
		this.ed_loc = new saiCBBL(this, {
			bound: [20, 30, 200, 20],
			caption: "Location",			
			multiSelection: false,			
			sql:["select  distinct location, descript, dcs_area from xlocation ", ["location","descript","dcs_area"],false, ["Lokasi","Nama Lokasi","Area"],"where","Data Location",true],
			change:[this,"doChange"]		
		});
		this.ed_area = new saiCBBL(this, {
			bound: [20, 32, 200, 20],
			caption: "Area",			
			multiSelection: false,			
			sql:["select  distinct dcs_area from xlocation ", ["dcs_area"],false, ["Area"],"where","Data Area",true],
			change:[this,"doChange"]		
		});
		this.ed_nik1 = new saiCBBL(this, {
			bound: [20, 3, 200, 20],
			caption: "Disetujui Oleh",
			multiSelection: false,
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
		});		
		this.p1 = new panel(this,{bound:[20,11,900,230],caption:"Data Mapping"});
		this.sg1 = new saiGrid(this.p1, {
			bound: [1, 20, 898, 180],
			colCount: 5,
			colTitle: ["Plant","Plant Desc","Location","Description","DCS Area"],
			colWidth: [[4,3, 2, 1, 0], [150,250, 50, 150,50]],			
			change: [this, "doGridChange"],
			rowCount: 1,
			tag: 9		
		});		
		//this.sgn = new sgNavigator(this.p1,{bound:[1,this.p1.height - 25,898,25],buttonStyle:bsView, grid:this.sg1});
		
		this.rearrangeChild(10,23);		
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);
					
		this.onClose.set(this,"doClose");				
	}
};
window.app_assetsap_master_fUpdateMapping.extend(window.childForm);
window.app_assetsap_master_fUpdateMapping.implement({
	doClose: function(sender){				
	},
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
	doModalResult: function(event, result){				
		try{
			if (result != mrOk) return;
			var sql = new server_util_arrayList();			
			switch(event){
				case "clear" :
					if (result == mrOk){
						this.standarLib.clearByTag(this, new Array("0","1","9"),this.ed_kode);		
						this.sg.clear(1);						
					}
				break;
				case "simpan" :
					if (this.dataLama.rs.rows.length == 0) throws("Tidak ada yg dirubah");
					var berubah = false;
					for (var i in this.dataLama.rs.rows){
						line = this.dataLama.rs.rows[i];
						for (var r = 0; r < this.sg1.getRowCount(); r++){
							berubah = berubah || (line.plant  != this.sg1.cells(0,r) || line.location  != this.sg1.cells(2,r) || line.dcs_area  != this.sg1.cells(4,r) || line.descript  != this.sg1.cells(3,r));							
						}
					}
					if (!berubah && this.dataLama.rs.rows.length == this.sg1.getRowCount()) throws("Tidak ada yg berubah");
					this.doClick();
					if (this.standarLib.checkEmptyByTag(this,[0,1,2,9])){
						
						sql.add("insert into amu_updasset_m (no_update, keterangan, tanggal, kode_lokfa, kode_klpfa, nik_setuju, periode, tgl_input, nik_user)"+
							" values('"+this.ed_kode.getText()+"', '"+this.ed_ket.getText()+"','"+this.dp_tgl.getDateString()+"','LOKASI','LOKASI','"+this.ed_nik1.getText()+"', '"+this.app._periode+"',now(), '"+this.app._userlog+"' )");
						var data = ["' '"];
						for (var i in this.dataLama.rs.rows){
							line = this.dataLama.rs.rows[i];
							sql.add("insert into amu_updxloc_h (no_update, location, plant, dcs_area)values('"+this.ed_kode.getText()+"','"+line.location+"','"+line.plnt+"', '"+line.dcs_area+"') ");
							sql.add("delete from xlocation where plnt = '"+line.plnt+"' and location = '"+line.location+"' and dcs_area = '"+line.dcs_area+"' ");
						}											
						
						for (var i = 0; i < this.sg1.getRowCount(); i++){
							sql.add("insert into amu_updxloc_d (no_update, location, plant, dcs_area)values('"+this.ed_kode.getText()+"','"+this.ed_loc.getText()+"','"+this.sg1.cells(0,i)+"', '"+this.sg1.cells(4,i)+"') ");
							//sql.add("update xlocation set dcs_area='"+this.sg1.cells(4,i)+"', plnt ='"+this.sg1.cells(0,i)+"' where location = '"+this.sg1.cells(0,i)+"' ");				
							sql.add("insert into xlocation (plnt, plant_descript, location, descript, dcs_area)values('"+this.sg1.cells(0,i)+"','"+this.sg1.cells(1,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(4,i)+"' )");
						}
						this.dbLib.execArraySQL(sql);
					}
				break;
				case "ubah" :
					
				break;
				case "delete" :
					
				break;
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectedDate: function(sender, y, m, d){       
    },
	doFindBtnClick: function(sender){
				
	},
	doChange: function(sender){
		try{
			if (sender == this.ed_loc){
				this.sg1.clear();
				this.lokfa = this.ed_loc.getText();
				var line,data = this.dbLib.getDataProvider("select plnt, plant_desc, location, descript, dcs_area from xlocation where location ='"+this.ed_loc.getText()+"' ",true);
				this.dataLama = data;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					this.sg1.appendData([line.plnt, line.plant_desc, line.location, line.descript, line.dcs_area]);
				}
			}			
			if (sender == this.ed_area){
				this.lokfa = this.ed_area.getText();
				this.sg1.clear();
				var line,data = this.dbLib.getDataProvider("select plnt, plant_desc, location, descript, dcs_area from xlocation where dcs_area ='"+this.ed_area.getText()+"' ",true);
				this.dataLama = data;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					this.sg1.appendData([line.plnt, line.plant_desc, line.location, line.descript, line.dcs_area]);
				}
			}
		}catch(e){
			alert(e);
		}
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_updasset_m','no_update',"REVISI-"+this.app._periode+".",'00'));
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
							this.app._mainForm.bClear.click();
                                                      
						}else system.info(this,result,"");
	    			break;
	    		}
			}
			catch(e)
			{
				systemAPI.alert("error = "+e,result);
			}
		}else if (sender == this.fileUtil){	        
        }
	}
});
