/**
 * @author mr
 */
window.app_budget_transaksi_fOutLook = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fOutLook.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fOutLook";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data OutLook : Input/Koreksi", 0);
		try{	
			uses("portalui_datePicker;portalui_saiGrid;portalui_sgNavigator;portalui_saiCBB");			
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,23,180,20],caption:"Tahun Angg.",tag:2,maxLength:4,tipeText:ttAngka,change:[this,"doChange"]});
			this.ePP = new portalui_saiCBBL(this,{bound:[20,25,200,20],caption:"PP", multiSelection:false,change:[this,"doChange"],tag:2});					
			this.cbPeriode = new portalui_saiCB(this,{bound:[20,12,180,20],caption:"Periode",items:["01","02","03","04","05","06","07","08","09","10","11","12"],tag:2,change:[this,"doChange"]});			
			//this.i_viewer = new portalui_imageButton(this,{bound:[200,12,20,20],hint:"Load Data",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoadData"]});
			
			this.i_viewer = new button(this,{bound:[829,12,80,18],caption:"Tampil",click:[this,"doLoadData"]});				
			this.p1 = new portalui_panel(this,{bound:[20,30,900,430],caption:"Daftar Akun OutLook"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,895,383],colCount:8,tag:2,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","DC","Nilai RKA","Nilai Realisasi","Nilai OutLook"],
					colWidth:[[0,1,2,3,4,5,6,7],[80,170,80,170,50,100,100,100]],colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0,2,4],[bsEllips,bsEllips,bsAuto]], 
					picklist:[[4],[new portalui_arrayMap({items:["C","D"]})]],ellipsClick:[this,"doEllipseClick"],
					columnReadOnly:[true,[1],[0]],change:[this,"doChangeCell"],autoAppend:true,defaultRow:1});
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,405,900,25],buttonStyle:2,grid:this.sg1});		
			
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.setTabChildIndex(); 

			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    this.standarLib = new util_standar();											
			this.sg1.onCellEnter.set(this, "doCellEnter");
			
			this.standarLib.clearByTag(this,["0","1"],undefined);				
			this.baris = this.app._baris;
			this.sg1.clear(1);
						
			this.cbPeriode.setText('01');			
			
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				line = data.rs.rows[0];							
				this.eTahun.setText(line.tahun);
			}
			
			if (this.app._userStatus == "A")
				this.ePP.setSQL("select kode_pp, nama from agg_pp where kode_lokasi = '"+this.app._lokasi+"' ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			else this.ePP.setSQL("select kode_pp, nama from agg_pp where kode_bidang = '"+this.app._kodeBidang+"' and kode_lokasi = '"+this.app._lokasi+"' ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.ePP.setText(this.app._kodePP);			
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_transaksi_fOutLook.extend(window.portalui_childForm);
window.app_budget_transaksi_fOutLook.implement({
	mainButtonClick : function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");		
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");		
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");		
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this, new Array("0","8","9"),undefined);				
					this.sg1.clear(1); 
				}
				break;
			case "simpan" :		
				var sql = new server_util_arrayList();				
				this.periode = this.eTahun.getText() + this.cbPeriode.getText();
				
				sql.add("delete from agg_outlook where kode_pp = '"+this.ePP.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and periode = '"+this.periode+"'");
				for (var i=0;i< this.sg1.getRowCount();i++){
					if (this.sg1.rowValid(i)){
						sql.add("insert into agg_outlook(kode_akun,kode_pp,periode,tahun,kode_lokasi,rka,realisasi,outlook,dc) values "+
								"('"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.periode+"','"+this.eTahun.getText()+"','"+this.app._lokasi+"',"+parseNilai(this.sg1.cells(5,i))+","+parseNilai(this.sg1.cells(6,i))+","+parseNilai(this.sg1.cells(7,i))+",'"+this.sg1.cells(4,i)+"')");
					}
				}
								
				this.dbLib.execArraySQL(sql);
				break;
			case "simpancek" : this.simpan();
				break;
		}
	},
	doChange: function(sender) {
		if (sender == this.eTahun || sender == this.ePP) this.sg1.clear(1);
		if (this.eTahun.getText() != "") {
			var sql = new server_util_arrayList(); 
			sql.add("select kode_akun, nama from agg_masakun where kode_lokasi='"+this.app._lokasi+"'");
			sql.add("select kode_pp, nama from agg_pp where tipe='posting' and kode_lokasi='"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);
		}
	},
	doLoadData: function(sender){	
		if (this.cbPeriode.getText() != "" && this.ePP.getText() != "") {
			var data = this.dbLib.getDataProvider("select a.kode_akun,e.nama as nama_akun,a.kode_pp,b.nama as nama_pp,a.dc,a.rka,a.realisasi,a.outlook "+
										"from agg_outlook a "+
										"         inner join agg_masakun e on a.kode_akun=e.kode_akun and e.kode_lokasi = '"+this.app._lokasi+"' "+
										"         inner join agg_pp b on a.kode_pp=b.kode_pp and b.kode_lokasi = '"+this.app._lokasi+"' "+
										"where a.periode = '"+this.eTahun.getText()+this.cbPeriode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_pp = '"+this.ePP.getText()+"' "+  
										"order by a.kode_akun,a.kode_pp ", true);			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([ line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.dc,floatToNilai(line.rka),floatToNilai(line.realisasi),floatToNilai(line.outlook)]);
				}
			} else this.sg1.clear(1);
			this.sg1.validasi();			
		}
	},
	doChangeCell: function(sender, col, row){
		sender.onChange.set(this,undefined);
	    if (col == 0) {
			var akun = this.dataAkun.get(sender.cells(0,row));
			if(akun)
				sender.cells(1,row,akun);
			else {                                    
				if (trim(sender.cells(0,row)) != "") system.alert(this,"Akun "+sender.cells(0,row)+" tidak ditemukan","Coba akun yang lainnya.","checkAkun");                
				sender.cells(0,row,"");
				sender.cells(1,row,"");
			}
		}
		if (col == 2) {
			var pp = this.dataPP.get(sender.cells(2,row));
			if(pp)
				sender.cells(3,row,pp);
			else {                                    
				if (trim(sender.cells(2,row)) != "") system.alert(this,"PP "+sender.cells(0,row)+" tidak ditemukan","Coba PP yang lainnya.","checkAkun");                
				sender.cells(2,row,"");
				sender.cells(3,row,"");
			}
		}
		sender.onChange.set(this,"doChangeCell");
	},
	doEllipseClick: function(sender, col, row){
		try{			
			if (sender == this.sg1) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select kode_akun, nama  from agg_masakun where kode_lokasi = '"+this.app._lokasi+"' order by kode_akun",
												  "select count(kode_akun) from agg_masakun where kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 2){
					this.standarLib.showListData(this, "Daftar PP",sender,undefined, 
												  "select kode_pp, nama  from agg_pp where kode_lokasi = '"+this.app._lokasi+"' order by kode_pp",
												  "select count(kode_pp) from agg_pp where kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
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
						this.app._mainForm.pesan(2,"Transaksi sukses tersimpan");						
						this.app._mainForm.bClear.click();              						
					}else system.info(this,result,"");
	    			break;	      			
					case "listData" :
						this.sg1.clear(1); 
					break;
					case "getMultiDataProvider":
	    			    eval("result = "+result+";");
	    			    if (typeof result != "string"){
                            this.dataAkun = new portalui_arrayMap();
							this.dataPP = new portalui_arrayMap();
							this.dataDRK = new portalui_arrayMap();
	    			        if (result.result[0]){	    			        
	    			            var line;
	    			            for (var i in result.result[0].rs.rows){
	    			                line = result.result[0].rs.rows[i];
	    			                this.dataAkun.set(line.kode_akun, line.nama);
                                }
                            }
							if (result.result[1]){	    			        
	    			            var line;
	    			            for (var i in result.result[1].rs.rows){
	    			                line = result.result[1].rs.rows[i];
	    			                this.dataPP.set(line.kode_pp, line.nama);
                                }
                            }
                        }else throw result;
	    			break;
	    		}
			}
			catch(e)
			{
				alert(e);
			}
	    }
	}
});
