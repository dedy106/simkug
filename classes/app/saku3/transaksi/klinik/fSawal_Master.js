window.app_saku3_transaksi_klinik_fSawal = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_klinik_fSawal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_klinik_fSawal";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Stock Opname: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Tahun",tag:2,maxLength:4});		
		this.cb_gudang = new portalui_saiCBBL(this,{bound:[20,16,220,20],caption:"Gudang",multiSelection:false,tag:1,change:[this,"doChange"]});
		this.bTampil = new portalui_button(this,{bound:[790,16,80,18],caption:"Load Data",click:[this,"doLoadData"]});		
		this.bUpload = new portalui_uploader(this,{bound:[890,16,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
		
		this.pc1 = new pageControl(this,{bound:[5,12,990,415], childPage:["Data Item Obat"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:0,
		            colTitle:["Kode","Nama","Pabrikasi","Satuan","Harga","Jumlah"],					
					colWidth:[[5,4,3,2,1,0],[80,80,80,300,300,80]],					
					readOnly:true,colFormat:[[4,5],[cfNilai,cfNilai]],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
				
		this.rearrangeChild(10, 22);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try{			
			this.sgn.uploader.setParam3("object");
			this.sg.setAllowBlank(true);
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_gudang.setSQL("select kode_pp, nama from kli_pp where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Gudang",true);
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun ",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.e_tahun.setText(line.tahun);										
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_klinik_fSawal.extend(window.portalui_childForm);
window.app_saku3_transaksi_klinik_fSawal.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.dataUpload = data;			
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].jumlah=0;				
				this.dataJU.rs.rows[i].harga=0;				
			}				
			var line; var line2;
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];
				for (var j=0;j < this.dataJU.rs.rows.length;j++){
					if (line.kode_obat == this.dataJU.rs.rows[j].kode_obat) {
						this.dataJU.rs.rows[j].jumlah = parseFloat(line.jumlah);						
						this.dataJU.rs.rows[j].harga = parseFloat(line.harga);						
					}
				}
			}			
			this.doTampilData(1);
   		}catch(e){
   		   this.sg.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
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
					sql.add("delete from kli_sawal where kode_pp='"+this.cb_gudang.getText()+"' and periode = '"+this.e_tahun.getText()+"01' and kode_lokasi='"+this.app._lokasi+"'");										
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						var line = this.dataJU.rs.rows[i];												
						sql.add("insert into kli_sawal (kode_obat,kode_lokasi,kode_pp,jumlah,harga,periode) values "+
						        "('"+line.kode_obat+"','"+this.app._lokasi+"','"+this.cb_gudang.getText()+"',"+line.jumlah+","+line.harga+",'"+this.e_tahun.getText()+"01')");
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
					this.standarLib.clearByTag(this, new Array("0"),this.e_nb);		
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
	doChange:function(sender){		
		if (sender == this.cb_gudang && this.stsSimpan == 1) {
			this.sg.clear(1);
		}				
	},	
	doLoadData:	function(sender){
		if (this.cb_gudang.getText()!="") {				
			var strSQL = "select a.kode_obat,a.nama,a.pabrik,a.sat_kecil as satuan,0 as harga, 0 as jumlah "+
			             "from kli_obat a "+						 
						 "where a.kode_lokasi='"+this.app._lokasi+"' ";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;							
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);	
		}
		else {
			system.alert(this,"Gudang harus diisi.","Pilih dari daftar");
		}			
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.kode_obat,line.nama,line.pabrik,line.satuan,floatToNilai(line.harga),floatToNilai(line.jumlah)]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku2_gl_rptBuktiJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_tahun.getText()+"01' ";
								this.filter = this.filter2;
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc1.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi","");							
								this.clearLayar();
							} 
						}else system.info(this,result,"");
	    			break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
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
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);						
		} catch(e) {
			alert(e);
		}
	}
});