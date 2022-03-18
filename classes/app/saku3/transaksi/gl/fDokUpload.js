window.app_saku3_transaksi_gl_fDokUpload = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_gl_fDokUpload.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_gl_fDokUpload";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Upload Dokumen", 0);	
		
		uses("pageControl;portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		
		this.c_periode = new saiCB(this,{bound:[20,14,202,20],caption:"Periode",readOnly:true,tag:2,change:[this,"doChange"]});		
		this.c_modul = new saiCB(this,{bound:[20,11,202,20],caption:"Modul",items:["JU","KB"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.e_nb = new portalui_saiCBBL(this,{bound:[20,10,220,20],caption:"No Bukti",multiSelection:false,tag:0,change:[this,"doChange"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,14,200,20],caption:"No Dokumen", readOnly:true});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Deskripsi", readOnly:true});				
		this.e_file = new saiLabelEdit(this,{bound:[20,15,450,20],caption:"File", readOnly:true, tag:0});		
		this.uploader = new uploader(this,{bound:[480,15,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		this.bLihat = new button(this,{bound:[580,15,80,18],caption:"Lihat File",click:[this,"doLihat"]});			
		
		this.pc1 = new pageControl(this,{bound:[1,12,995,320], childPage:["Data Item Jurnal"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,270,50,200,80]],					
					readonly:true,colFormat:[[4],[cfNilai]],nilaiChange:[this,"doNilaiChange"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		
		this.rearrangeChild(10, 23);
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.rootDir = this.app._rootDir;
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			
			this.c_periode.items.clear();
			var data = this.dbLib.getDataProvider("select periode from periode where kode_lokasi='"+this.app._lokasi+"' union select substring(CONVERT(varchar,GETDATE(),112),1,6) as periode order by periode desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_periode.addItem(i,line.periode);
				}
			}


		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_gl_fDokUpload.extend(window.childForm);
window.app_saku3_transaksi_gl_fDokUpload.implement({	
	doLihat: function(sender){
		try{
			if (this.e_file.getText() != "" || this.e_file.getText() != "-") window.open("server/media/"+this.e_file.getText());
		}catch(e){
			alert(e);
		}
	},
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.e_file.setText(data.filedest);
			this.dataUpload = data;
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;
		}catch(e){
			alert(e);
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
					sql.add("insert into dok_load(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi) values ('"+this.e_nb.getText()+"','"+this.e_file.getText()+"',0,'"+this.c_modul.getText()+"','"+this.app._lokasi+"')");					
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
					setTipeButton(tbAllFalse);					
				break;
			case "simpan" :							
			case "ubah" :							
				this.viewLap = true;				
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.viewLap = false;				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from dok_load where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");													
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;					
		}
	},		
	doChange:function(sender){
		try {
			if ((sender == this.c_modul || sender == this.c_periode) && this.c_modul.getText()!="" && this.c_periode.getText()!="") {								
				if (this.c_modul.getText() == "JU")
					this.e_nb.setSQL("select no_ju,keterangan from ju_m where periode='"+this.c_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_ju","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);						
				else 
					this.e_nb.setSQL("select no_kas,keterangan from kas_m where periode='"+this.c_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_kas","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);						
			}
			
			if (sender == this.e_nb && this.e_nb.getText()!="") {								
				if (this.c_modul.getText() == "JU") var strSQL = "select a.no_dokumen,a.keterangan,isnull(b.no_gambar,'-') as no_gambar from ju_m a left join dok_load b on a.no_ju=b.no_bukti and a.kode_lokasi=b.kode_lokasi where a.no_ju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
				else var strSQL = "select a.no_dokumen,a.keterangan,isnull(b.no_gambar,'-') as no_gambar from kas_m a left join dok_load b on a.no_kas=b.no_bukti and a.kode_lokasi=b.kode_lokasi where a.no_kas='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);							
						this.e_file.setText(line.no_gambar);
						this.fileBfr = line.no_gambar;
						
						if (line.no_gambar == "-") setTipeButton(tbSimpan);
						else setTipeButton(tbUbahHapus);
					}
				}
				if (this.c_modul.getText() == "JU")
					var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
								"from ju_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"            inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+													
								"            left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+													
								"where a.no_ju = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				else 
					var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
								"from kas_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"            inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+													
								"            left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+													
								"where a.no_kas = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
					}
				} else this.sg.clear(1);							
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.viewLap) {
								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
								}									
								if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
								
								this.nama_report="server_report_saku2_kopeg_kbitt_rptBebanFormTu";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
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
								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
								}									
								if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
								
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);						
			setTipeButton(tbAllFalse);			
		} catch(e) {
			alert(e);
		}
	}
});