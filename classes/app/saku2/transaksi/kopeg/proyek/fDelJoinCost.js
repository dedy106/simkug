window.app_saku2_transaksi_kopeg_proyek_fDelJoinCost = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_proyek_fDelJoinCost.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_proyek_fDelJoinCost";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Hapus Join Cost: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,12,220,20],caption:"Bagian / Unit",tag:2,multiSelection:false,change:[this,"doChange"]}); 				
		this.cb_id = new portalui_saiCBBL(this,{bound:[20,19,220,20],caption:"ID Project",tag:1,multiSelection:false,change:[this,"doChange"]}); 				
		this.e_uraian = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"Nama Project", readOnly:true});				
		this.e_nproyek = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Nilai Proyek", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,330], childPage:["Data Join Cost"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:0,
		            colTitle:["Status","No Agenda","Keterangan","Nilai"],
					colWidth:[[3,2,1,0],[100,350,100,80]],					
					columnReadOnly:[true,[0,1,2,3],[]],
					buttonStyle:[[0],[bsAuto]], 
					colFormat:[[3],[cfNilai]],picklist:[[0],[new portalui_arrayMap({items:["DEL","AKTIF"]})]],checkItem: true,					
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.rearrangeChild(10, 23);
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);						
			this.cb_pp.setText(this.app._kodePP,this.app._namaPP);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_proyek_fDelJoinCost.extend(window.childForm);
window.app_saku2_transaksi_kopeg_proyek_fDelJoinCost.implement({	
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i) == "DEL"){																							
								sql.add("delete from pr_joincost_d where no_aju='"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");								
								sql.add("delete from pr_beban_d where modul='JOIN' and no_aju='"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");								
							}
						}
					}
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);						
					this.sg.clear(1);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},	
	doChange:function(sender){
		if (sender==this.cb_pp && this.cb_pp.getText()!="") {			
			this.cb_id.setText("","");
			this.cb_id.setSQL("select no_proyek, keterangan from pr_proyek_m where kode_pp='"+this.cb_pp.getText()+"'  and kode_lokasi='"+this.app._lokasi+"'",["no_proyek","keterangan"],false,["ID Project","Deskripsi"],"and","Data Project",true);									
		}
		if (sender==this.cb_id && this.cb_id.getText()!="") {
			var strSQL = "select a.keterangan,a.nilai "+
			             "from pr_proyek_m a "+						 
						 "where a.no_proyek = '"+this.cb_id.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];				
				this.e_uraian.setText(line.keterangan);
				this.e_nproyek.setText(floatToNilai(line.nilai));								
			}
			
			var data = this.dbLib.getDataProvider("select no_aju,keterangan,nilai from pr_beban_d where no_proyek='"+this.cb_id.getText()+"' and modul = 'JOIN' order by no_aju",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["AKTIF",line.no_aju,line.keterangan,floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);							
			
			
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tereksekusi","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}		
});