window.app_saku3_transaksi_dw_fSawal = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_dw_fSawal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_dw_fSawal";
		this.itemsValue = new portalui_arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Saldo Akreditasi ", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");

		this.cb_lokasi = new saiCBBL(this,{bound:[20,13,220,20],caption:"Kode Lokasi", multiSelection:false, maxLength:10, tag:9,readOnly:true});
		//this.cb_prodi = new saiCBBL(this,{bound:[20,10,220,20],caption:"PP - Prodi", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		this.c_jenis = new portalui_saiCB(this,{bound:[20,10,200,20],caption:"Jenis PP",items:["PP-Prodi","Fakultas"],tag:2,readOnly:true, change:[this,"doChange"]});		
		this.cb_pp = new saiCBBL(this,{bound:[20,11,220,20],caption:"PP / Fakultas", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		this.cb_fs = new saiCBBL(this,{bound:[20,12,220,20],caption:"FS", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"] });
		this.cb1 = new portalui_checkBox(this,{bound:[120,14,200,25],caption:" Hapus Data Sebelumnya",selected:false});
	
		this.pc1 = new pageControl(this,{bound:[5,13,990,400], childPage:["Data Akreditasi","Baris Error"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:0,
		            colTitle:["Kode Neraca","Kode Lokasi","Kode FS","Kode PP","Tahun","Nilai","Validasi"],					
					colWidth:[[6,5,4,3,2,1,0],[100,150,100,100,100,100,100]],
					colFormat:[[5],[cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],					
					readOnly:true,autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager1"]});		
		
		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});		
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg3, pager:[this,"doPage3"]});		

		this.rearrangeChild(10, 22);
		
		setTipeButton(tbSimpan);			
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try{			
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.cb_fs.setSQL("select kode_fs, nama from fs where kode_lokasi='"+this.app._lokasi+"'",["kode_fs","nama"],false,["Kode","Nama"],"and","Data FS",true);			
			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi='"+this.app._lokasi+"'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);			
			this.cb_lokasi.setText(this.app._lokasi);
			this.c_jenis.setText("PP-Prodi");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_dw_fSawal.extend(window.portalui_childForm);
window.app_saku3_transaksi_dw_fSawal.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			//if(sender == this.cb_prodi || this.cb_fs && this.cb_prodi.getText() != "" && this.cb_fs.getText() != ""){
				for (var i=0;i < this.sg.getRowCount();i++){
					this.sg.cells(6,i) == "-";
					if (this.sg.cells(3,i) == this.cb_pp.getText() && this.sg.cells(2,i) == this.cb_fs.getText() && this.sg.cells(1,i) == this.cb_lokasi.getText() ) {						
						this.sg.cells(6,i,"VALID");				
					} else this.sg.cells(6,i,"INVALID");	
					if (this.sg.cells(6,i) == "INVALID") this.inValid = true;
				}	
			//}
			
			/*if(sender == this.cb_fak || this.cb_fs && this.cb_fak.getText() != "" && this.cb_fs.getText() != ""){
				for (var i=0;i < this.sg.getRowCount();i++){
					this.sg.cells(6,i) == "-";
					if (this.sg.cells(3,i) == this.cb_fak.getText() && this.sg.cells(2,i) == this.cb_fs.getText() ) {						
						this.sg.cells(6,i,"VALID");				
					} else this.sg.cells(6,i,"INVALID");
					if (this.sg.cells(6,i) == "INVALID") this.inValid = true;
				}	
			}*/
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			
			if (this.inValid) {
				this.pc1.setActivePage(this.pc1.childPage[1]);	
				this.sg3.clear();
				for (var i=0; i < this.sg.getRowCount();i++) {
					if (this.sg.cells(6,i) == "INVALID") {
						var j = i+1;
						this.sg3.appendData([j]);						
					}
				} system.alert(this,"Periksa Kembali data PP/FS.","");
				this.stsSimpan =0; setTipeButton(tbAllFalse);
			}			
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();	
						
		} catch(e) {alert(e);}
	},
	doPager1: function(sender,page){
		this.sg.doSelectPage(page);
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
	simpan: function(){			
		try{					
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{																								
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					
					if (this.cb1.isSelected()) {
						sql.add("delete from exs_akre_glma where kode_pp = '"+this.cb_pp.getText()+"' and kode_fs = '"+this.cb_fs.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into exs_akre_glma(kode_neraca,kode_lokasi,kode_fs,kode_pp,tahun,nilai) values "+
										"('"+this.sg.cells(0,i)+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"',"+nilaiToFloat(this.sg.cells(5,i))+")");
							}
						}						
					}			
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0"));		
					this.sg.clear(1);										
				}
				break;
			case "simpan" :				
				this.preView = "1";								
				this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;			
		}
	},		
		
	doChange: function(sender){
		try{
			if (sender == this.c_jenis && this.c_jenis.getText() == "PP-Prodi"){
				this.cb_pp.setSQL("select kode_pp, nama from exs_pp where flag_aktif = '1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi",true);			
			}
			if (sender == this.c_jenis && this.c_jenis.getText() == "Fakultas"){
				this.cb_pp.setSQL("select kode_fakultas, nama from exs_fakultas where flag_aktif = '1' and kode_lokasi='"+this.app._lokasi+"'",["kode_fakultas","nama"],false,["Kode","Nama"],"and","Data Fakultas",true);			
			}
			
			/*if (sender == this.cb_pp && this.cb_pp.getText() != ""){
				var strSQL = "select * from exs_akre_glma where kode_pp ='"+this.cb_pp.getText()+"' and kode_fs ='"+this.cb_fs.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);		
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
					setTipeButton(tbUbahHapus);
				} else this.sg.clear(1);
			}	*/	
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doTampilData: function(page) {
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.kode_neraca,line.kode_lokasi,line.kode_fs,line.kode_pp,line.tahun,parseFloat(line.nilai),"VALID"]);
		}
		this.sg.setNoUrut(start);
	},

	doPager: function(sender, page){
		this.doTampilData(page);
	},
	/*doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	*/
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");							
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
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"));
			this.sg.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbSimpan);						
		} catch(e) {
			alert(e);
		}
	}
});