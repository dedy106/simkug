window.app_saku3_transaksi_haji_fTarget = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_haji_fTarget.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_haji_fTarget";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Target Marketing: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Tahun",tag:2,maxLength:4,change:[this,"doChange"],tipeText:ttAngka});		
		this.cb_jadwal = new portalui_saiCBBL(this,{bound:[20,16,220,20],caption:"Jadwal",multiSelection:false,tag:1,change:[this,"doChange"]});
		this.e_tgl = new portalui_saiLabelEdit(this,{bound:[20,13,200,20],caption:"Tanggal",tag:1,readOnly:true});		
		this.e_kelas = new portalui_saiLabelEdit(this,{bound:[20,12,420,20],caption:"Kelas",tag:1,readOnly:true});		
		this.e_produk = new portalui_saiLabelEdit(this,{bound:[20,11,420,20],caption:"Produk",tag:1,readOnly:true});				
		this.e_quota = new portalui_saiLabelEdit(this,{bound:[20,15,200,20],caption:"Quota",tag:1,readOnly:true,tipeText:ttNilai,text:"0"});		
		this.e_total = new portalui_saiLabelEdit(this,{bound:[240,15,200,20],caption:"Total",tag:1,readOnly:true,tipeText:ttNilai,text:"0"});				
		
		this.pc1 = new pageControl(this,{bound:[5,12,600,315], childPage:["Data Marketing"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:0,
		            colTitle:["Kode","Nama","Jumlah"],					
					colWidth:[[2,1,0],[80,300,80]],					
					columnReadOnly:[true,[0,1],[2]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					colFormat:[[2],[cfNilai]],autoAppend:false,defaultRow:1});							
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		
				
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
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
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
window.app_saku3_transaksi_haji_fTarget.extend(window.portalui_childForm);
window.app_saku3_transaksi_haji_fTarget.implement({	
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
					sql.add("delete from haj_target where no_jadwal='"+this.cb_jadwal.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");															
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){													
								sql.add("insert into haj_target(no_jadwal,kode_lokasi,kode_pic,jumlah,nik_user,tgl_input) values "+  
									   "('"+this.cb_jadwal.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+",'"+this.app._userLog+"',getdate())");
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
		if (sender == this.e_tahun && this.e_tahun.getText()!="") {
			this.cb_jadwal.setSQL("select no_jadwal, nama from haj_jadwal where tahun='"+this.e_tahun.getText()+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["no_jadwal","nama"],false,["Kode","Nama"],"and","Data Jadwal",true);
		}
		if (sender == this.cb_jadwal && this.cb_jadwal.getText()!="") {			
			var strSQL = "select a.kode_kelas+' - '+a.nama as kelas,b.kode_produk+' - '+b.nama as produk,c.quota,convert(varchar,c.tanggal,103) as tgl "+
						 "from haj_jadwal c inner join haj_kelas a on c.kode_kelas=a.kode_kelas and c.kode_lokasi=a.kode_lokasi "+
						 "                  inner join haj_produk b on b.kode_produk=a.kode_produk and b.kode_lokasi=a.kode_lokasi "+
						 "where c.no_jadwal ='"+this.cb_jadwal.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"'";						   			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){				
					this.e_tgl.setText(line.tgl);
					this.e_kelas.setText(line.kelas);
					this.e_produk.setText(line.produk);					
					this.e_quota.setText(floatToNilai(line.quota));					
				}
			}
			this.doLoadData();
		}				
	},	
	doLoadData:	function(sender){
		if (this.cb_jadwal.getText()!="") {				
			var strSQL = "select a.kode_pic,a.nama,isnull(b.jumlah,0) as jml "+
						 "from haj_pic a left join haj_target b on a.kode_pic=b.kode_pic and a.kode_lokasi=b.kode_lokasi and b.no_jadwal='"+this.cb_jadwal.getText()+"'  "+
						 "where a.kode_lokasi='"+this.app._lokasi+"'";													
			var data1 = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg.clear();
				for (var i in data1.rs.rows){
					line1 = data1.rs.rows[i];																													
					this.sg.appendData([line1.kode_pic,line1.nama,floatToNilai(line1.jml)]);
				}
			} else this.sg.clear(1);																
		}
		else {
			system.alert(this,"Jadwal harus diisi.","Pilih dari daftar");
		}			
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku2_gl_rptBuktiJurnal";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_tahun.getText()+"01' ";
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
	},
	doNilaiChange: function(){
		try{						
			var tot = 0;			
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(2,i) != "" ) {					
					tot += nilaiToFloat(this.sg.cells(2,i));										
				}
			}						
			this.e_total.setText(floatToNilai(tot));						
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},					
	doChangeCell: function(sender, col, row){				
		if (col == 2) this.sg.validasi();
	}
});