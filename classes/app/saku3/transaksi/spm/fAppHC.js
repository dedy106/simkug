window.app_saku3_transaksi_spm_fAppHC = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_spm_fAppHC.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spm_fAppHC";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approval SPPD - HC", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,440], childPage:["Daftar SPJ","Detail PD","Filter Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:12,tag:0,
		            colTitle:["No SPJ","Status","Tanggal","NIK","Nama","Tgl Mulai","Tgl Selesai","No Dokumen","Tujuan","Kota","Tgl Input","No Pengajuan"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[170,110,150,250,150,75,75,150,80,75,70,180]],	
					readOnly:true,									
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Status",items:["APPROVE","DISAPP","RETURN"], readOnly:true,tag:0});
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,10,200,20],caption:"No App", readOnly:true,visible:false});						
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,10,550,50],caption:"Catatan",tag:9,readOnly:true});						
		this.e_nospj = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,300,20],caption:"No SPJ", readOnly:true});		
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[325,12,245,20],caption:"Tanggal PD", readOnly:true, labelWidth:70});		
		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,300,20],caption:"No Dokumen", readOnly:true});								
		this.e_noaju = new saiLabelEdit(this.pc1.childPage[1],{bound:[325,10,245,20],caption:"Pengajuan", readOnly:true, labelWidth:70});		
		this.e_tujuan = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,550,20],caption:"Tujuan", readOnly:true});						
		this.e_dasar = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,550,20],caption:"Dasar / Alasan", readOnly:true});										
		this.e_trans = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,300,20],caption:"Sarana Transport", readOnly:true});								
		this.e_kota = new saiLabelEdit(this.pc1.childPage[1],{bound:[325,14,245,20],caption:"Kota Tujuan", readOnly:true, labelWidth:70});								
		this.e_akun = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,550,20],caption:"Beban Anggaran", readOnly:true});					
		this.e_nik = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,550,20],caption:"NIK - Nama", readOnly:true});									
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[790,11,200,20],caption:"Total Biaya", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				

		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,189],colCount:7,tag:0,
					colTitle:["Uraian","%","Jumlah","Satuan","Tarif","Total","Keterangan"],
					colWidth:[[6,5,4,3,2,1,0],[200,80,80,80,80,80,300]],
					readOnly:true,
					colFormat:[[1,2,4,5],[cfNilai,cfNilai,cfNilai,cfNilai]],
					defaultRow:1,
					nilaiChange:[this,"doNilaiChange2"],autoAppend:false});
	
		this.cb_nb = new saiCBBL(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:9});
		this.bLoad= new button(this.pc1.childPage[2],{bound:[120,16,100,18],caption:"Cari",click:[this,"doLoadCari"]});
	
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
				
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();		
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try {			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();						
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_spm_fAppHC.extend(window.childForm);
window.app_saku3_transaksi_spm_fAppHC.implement({	
	doLoad:function(sender){					
		var strSQL = "select a.no_spj, 'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,d.tgl_awal,103) as tglawal,convert(varchar,d.tgl_akhir,103) as tglakhir,a.no_dokumen,d.tujuan,d.kota,c.nik,c.nama,convert(varchar,a.tgl_input,120) as tglinput,b.no_aju "+
					 "from pd_spj_m a "+
					 "		inner join pd_aju_nik b on a.no_spj=b.no_spj and a.kode_lokasi=b.kode_lokasi and b.progress='1' "+
					 "      inner join karyawan c on b.nik=c.nik and b.kode_lokasi=c.kode_lokasi "+
					 "		inner join pd_aju_m d on b.no_aju=d.no_aju and b.kode_lokasi=d.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"' "+						
					 "order by a.tanggal";	
					 					
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataGrid = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);	
		
		//load utk cari data koreksi
		this.cb_nb.setSQL("select no_aju, nik from pd_aju_nik where no_app1<>'-' and progress in ('2','Z','R') and kode_lokasi='"+this.app._lokasi+"'",["no_aju","nik"],false,["No Pengajuan","NIK"],"and","Daftar Pengajuan",true);																					
	},							
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataGrid.rs.rows.length? this.dataGrid.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataGrid.rs.rows[i];																			
			this.sg.appendData([line.no_spj,line.status.toUpperCase(),line.tgl,line.nik,line.nama,line.tglawal,line.tglakhir,line.no_dokumen,line.tujuan,line.kota,line.tglinput,line.no_aju]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doLoadCari:function(sender){			
		if (this.cb_nb.getText() != "") {			
			var strSQL = "select a.no_spj, case b.progress when '2' then 'APPROVE' when 'Z' then 'DISAPP' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,d.tgl_awal,103) as tglawal,convert(varchar,d.tgl_akhir,103) as tglakhir,a.no_dokumen,d.tujuan,d.kota,c.nik,c.nama,convert(varchar,a.tgl_input,120) as tglinput,b.no_aju "+
					 "from pd_spj_m a "+
					 "		inner join pd_aju_nik b on a.no_spj=b.no_spj and a.kode_lokasi=b.kode_lokasi "+
					 "      inner join karyawan c on b.nik=c.nik and b.kode_lokasi=c.kode_lokasi "+
					 "		inner join pd_aju_m d on b.no_aju=d.no_aju and b.kode_lokasi=d.kode_lokasi "+					 
					 "where a.kode_lokasi='"+this.app._lokasi+"' and b.no_aju='"+this.cb_nb.getText()+"' and b.nik='"+this.cb_nb.rightLabelCaption+"' "+						
					 "order by a.tanggal";					 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataGrid = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);																	
			this.pc1.setActivePage(this.pc1.childPage[0]);				
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();						
					if (this.c_status.getText() == "APPROVE") var vStatus = "2";																		
					if (this.c_status.getText() == "DISAPP") var vStatus = "Z";																		
					if (this.c_status.getText() == "RETURN") var vStatus = "R"; 

					sql.add("update spm_app_m set no_flag='"+this.e_nb.getText()+"' where no_bukti='"+this.e_nospj.getText()+"' and no_flag='-' and form='APPHC' and modul='SPPD' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into spm_app_m (no_app,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag,nik_bdh,nik_fiat) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+vStatus+"','SPPD','APPHC','"+this.e_nospj.getText()+"','"+this.e_memo.getText()+"','-','X','X')");					
					sql.add("update pd_aju_nik set no_app1='"+this.e_nb.getText()+"',progress='"+vStatus+"' where nik='"+this.nik+"' and no_aju='"+this.e_noaju.getText()+"' and no_spj='"+this.e_nospj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.sg2.clear(1); 
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.e_memo.setText("");
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :	
			case "ubah" :					
				this.preView = "1";								
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																				
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
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();									
				sql.add("delete from spm_app_m where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");				
				sql.add("update pd_aju_nik set no_app1='-',progress='1' where no_aju='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
				sql.add("update pd_aju_nik set no_app1='-',progress='1' where no_app1='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);					
				this.dbLib.execArraySQL(sql);				
				break;					
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		if (this.stsSimpan == 1) {
			this.doClick();
			this.doLoad();
		}
	},		
	doClick:function(sender){		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"spm_app_m","no_app",this.app._lokasi+"-GS"+this.e_periode.getText().substr(2,4)+".","0000"));																					
	},		
	doDoubleClick: function(sender, col , row) {
		try{					
			if (sender.cells(0,row) != "") {							
				this.pc1.setActivePage(this.pc1.childPage[1]);											
				if (sender.cells(1,row) == "RETURN") this.c_status.setText(sender.cells(1,row));								
				else this.c_status.setText("APPROVE");	
				this.e_memo.setFocus();					

				this.nik = sender.cells(3,row);
				this.e_dok.setText(sender.cells(7,row));
				this.e_nik.setText(sender.cells(3,row)+" - "+sender.cells(4,row));
				this.e_nospj.setText(sender.cells(0,row));
				this.e_noaju.setText(sender.cells(11,row));
				var str = "select convert(varchar,a.tgl_awal,103)+' - '+convert(varchar,a.tgl_akhir,103) as tgl, a.tujuan,a.dasar,a.transport,a.kota,a.kode_akun+' - '+b.nama as akun "+
						  "from pd_aju_m a "+
						  "		inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+						  
						  "where a.no_aju='"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'"
				var data = this.dbLib.getDataProvider(str,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_tgl.setText(line.tgl);	
						this.e_tujuan.setText(line.tujuan);	
						this.e_dasar.setText(line.dasar);	
						this.e_trans.setText(line.transport);
						this.e_akun.setText(line.akun);
						this.e_kota.setText(line.kota);								
					} 
				}

				var str2 = "select * from pd_spj_d where nik='"+this.nik+"' and no_spj = '"+this.e_nospj.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' order by nu";										
				var data = this.dbLib.getDataProvider(str2,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg2.appendData([line.uraian,floatToNilai(line.persen),floatToNilai(line.jumlah),line.satuan,floatToNilai(line.tarif),floatToNilai(line.total),line.keterangan]);
					}
					this.noAppLama = line.no_app1;
				} else this.sg2.clear(1);
				this.sg2.validasi();

				if (this.sg.cells(1,row) == "INPROG") {
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				}
				else {
					setTipeButton(tbUbahHapus);
					this.stsSimpan = 0;
				}				
			}
		} catch(e) {
			alert(e);
		}
	},	
	doNilaiChange2: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.getCell(5,i) != ""){
					tot += nilaiToFloat(this.sg2.getCell(5,i));			
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
							if (this.preView == "1") {
								//this.nama_report="server_report_saku3_hutang_rptSpbForm";									                  
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spb='"+this.e_nb.getText()+"' ";
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
			this.sg2.clear(1); 
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);				
			this.e_memo.setText("");
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	}
});

