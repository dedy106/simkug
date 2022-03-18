window.app_saku2_transaksi_kopeg_panjar_proses_fPtgVerE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_panjar_proses_fPtgVerE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_panjar_proses_fPtgVerE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi Permohonan : Edit", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		
		this.pc1 = new pageControl(this,{bound:[20,18,980,480], childPage:["Detail Pertanggungan","Data KPA"]});										
		this.c_status = new saiCB(this.pc1.childPage[0],{bound:[20,10,202,20],caption:"Status Approval",items:["APPROVE","RETURN"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_noptg = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"No Ptg", readOnly:true});						
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,13,450,20],caption:"No Dokumen", readOnly:true});						
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"Deskripsi", readOnly:true});								
		this.e_nik = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,15,450,20],caption:"Pemegang PJ", readOnly:true});										
		this.e_memo = new saiMemo(this.pc1.childPage[0],{bound:[20,12,450,80],caption:"Catatan",tag:9,readOnly:true});
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[770,12,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
	
		this.sg3 = new saiGrid(this.pc1.childPage[0],{bound:[10,10,this.pc1.width-20,this.pc1.height-170],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,200,50,150,80]],										
					readOnly:true,colFormat:[[4],[cfNilai]],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});		
					
		this.sg4 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});			

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);					
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_panjar_proses_fPtgVerE.extend(window.childForm);
window.app_saku2_transaksi_kopeg_panjar_proses_fPtgVerE.implement({
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
					sql.add("delete from ver_m where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ver_d where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("update panjarptg2_m set progress='0',no_ver='-' where no_ptg='"+this.e_noptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");									
					
					if (this.c_status.getText()=="APPROVE")  var prog = "2";
					if (this.c_status.getText()=="RETURN")  var prog = "R";
					
					sql.add("update a set no_verseb ='"+this.e_nb.getText()+"' "+
					        "from ver_m a inner join ver_d b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi and a.no_verseb='-' "+
							"where b.no_bukti ='"+this.e_noptg.getText()+"' and b.modul='PJPTG2' and b.kode_lokasi='"+this.app._lokasi+"'");
							
					sql.add("update panjarptg2_m set progress='"+prog+"',no_ver='"+this.e_nb.getText()+"' where no_ptg='"+this.e_noptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into ver_m (no_ver,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','PJPTG2')");
					
					sql.add("insert into ver_d (no_ver,status,modul,no_bukti,kode_lokasi,catatan) values "+
						    "('"+this.e_nb.getText()+"','"+prog+"','PJPTG2','"+this.e_noptg.getText()+"','"+this.app._lokasi+"','"+this.e_memo.getText()+"')");					
							
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
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.sg3.clear(1); this.sg4.clear(1); 					
					this.e_memo.setText("-");
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :					
				this.preView="1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				} 
				else
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :					
				this.preView="0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();								
				sql.add("delete from ver_m where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from ver_d where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");															
				sql.add("update panjarptg2_m set progress='0',no_ver='-' where no_ptg='"+this.e_noptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																	
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
	},		
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText() != "") {										 
			this.e_nb.setSQL("select b.no_ver, b.no_bukti from ver_d b inner join panjarptg2_m a on a.no_ptg=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.modul='PJPTG2' "+
							 "       inner join ver_m c on b.no_ver=c.no_ver and a.kode_lokasi=c.kode_lokasi and c.no_verseb='-' "+ 							 
			                 "where c.status in ('APPROVE','RETURN') and a.progress in ('2','R') and c.periode='"+this.e_periode.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",["b.no_ver","b.no_bukti"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {					
			var strSQL = "select a.tanggal,c.no_ptg,c.keterangan,c.no_dokumen,e.nik+' - '+e.nama as pemegang,b.catatan,case c.progress when '2' then 'APPROVE' when 'R' then 'RETURN' end as progress "+						 
						 "from ver_m a inner join ver_d b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi "+
						 "             inner join panjarptg2_m c on b.no_bukti=c.no_ptg and b.kode_lokasi=c.kode_lokasi "+
						 "             inner join panjar2_m d on c.no_panjar=d.no_panjar and d.kode_lokasi=c.kode_lokasi "+
						 "             inner join karyawan e on d.nik_buat=e.nik and d.kode_lokasi=e.kode_lokasi "+
						 "where a.no_ver='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){															
					this.dp_d1.setText(line.tanggal);										
					this.e_dok.setText(line.no_dokumen);
					this.e_ket.setText(line.keterangan);
					this.c_status.setText(line.progress.toUpperCase());
					this.e_noptg.setText(line.no_ptg);
					this.e_nik.setText(line.pemegang);					
					this.e_memo.setText(line.catatan);
				} 
			}			
			var data = this.dbLib.getDataProvider(
						"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from panjarptg2_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"            	     inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						"                    left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
						"where a.no_ptg = '"+this.e_noptg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg3.clear();				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg3.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
				}
			} else this.sg3.clear(1);
			
			this.sg3.validasi();
			var data = this.dbLib.getDataProvider(
						"select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.saldo,a.nilai,a.saldo-a.nilai as sakhir "+
						"from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						"              left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where a.no_bukti = '"+this.e_noptg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='PJPTG2' order by a.kode_akun",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg4.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg4.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,floatToNilai(line.saldo),floatToNilai(line.nilai),floatToNilai(line.sakhir)]);
				}
			} else this.sg4.clear(1);									
		}
	},
	doNilaiChange: function(){
		try{			
			var tot=0;
			for (var i = 0; i < this.sg3.rows.getLength();i++){
				if (this.sg3.rowValid(i) && this.sg3.cells(4,i) != ""){
					if (this.sg3.cells(2,i)=="C") tot += nilaiToFloat(this.sg3.cells(4,i));
					if (this.sg3.cells(2,i)=="D") tot -= nilaiToFloat(this.sg3.cells(4,i));
				}
			}								
			this.e_total.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView=="1") {							
								this.nama_report="server_report_saku2_........";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ver='"+this.e_nb.getText()+"' ";
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
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.sg3.clear(1); this.sg4.clear(1); 					
			this.e_memo.setText("-");
			setTipeButton(tbUbahHapus);
		} catch(e) {
			alert(e);
		}
	}
});