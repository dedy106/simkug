window.app_saku3_transaksi_sppd_fBatch = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_sppd_fBatch.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sppd_fBatch";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Batching SPPD", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,410], childPage:["Daftar SP","Detail PD","Filter Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:9,tag:0,
		            colTitle:["No SP","Status","Tgl Mulai","Tgl Selesai","Maksud/Tujuan","Kota Asal","Kota Tujuan","Jml Pengajuan","Input Pengajuan"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[90,90,95,95,250,80,80,70,100]],	
					colFormat:[[7,8],[cfNilai,cfNilai]],						
					readOnly:true,										
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:12,tag:0,
			colTitle:["Status","No Pengajuan","No SP","NIK/Nama", "Tgl Berangkat","Tgl Tiba","Lama Hari","NIK Atasan1","App Atasan1","NIK Atasan2","App Atasan2","Progress"],
			colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[200,100,150,100,150,70,70,70,250,100,100,80]],
			readOnly:true,			
			colHide:[[0],[true]],
			colFormat:[[6],[cfNilai]],						
			buttonStyle:[[0],[bsAuto]], 	
			buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["APP","NONAPP"]})]],
			defaultRow:1,
			dblClick:[this,"doDoubleClick2"],
			autoAppend:false});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});										

		this.cb_nb = new saiCBBL(this.pc1.childPage[2],{bound:[20,12,220,20],caption:"No Perintah", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);	
			
				
		setTipeButton(tbSimpan);				
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
window.app_saku3_transaksi_sppd_fBatch.extend(window.childForm);
window.app_saku3_transaksi_sppd_fBatch.implement({	
	isiCBPerintah: function() {
		//S = return di verifikasi tidak jadi syarat,krn utk HAPUS BUDEL..no perintah harus muncul
		this.cb_nb.setSQL("select no_perintah,keterangan from sp_perintah_m where no_batch<>'-' and kode_lokasi='"+this.app._lokasi+"' "+
						  " and no_perintah not in (select distinct no_perintah from sp_spj_m where progress in ('3','Z') and kode_lokasi='"+this.app._lokasi+"' )",["no_perintah","keterangan"],false,["No SP","Deskripsi"],"and","Data Perintah",true);
	},
	doLoad:function(sender){				
		var strSQL =    "select a.no_perintah,'INPROG' as status "+
						",convert(varchar,a.tgl_mulai,103) as tglawal "+
						",convert(varchar,a.tgl_selesai,103) as tglakhir "+
						",a.keterangan "+
						",b.nama as asal "+
						",c.nama as tujuan "+
						",d.jum_aju "+
						",isnull(e.jum_input,0) as jum_input "+

						"from sp_perintah_m a "+
						"inner join sp_kota b on a.asal=b.kode_kota "+
						"inner join sp_kota c on a.tempat=c.kode_kota "+
						"inner join ( "+
							"select no_perintah,sum(jumlah+jum_driver) as jum_aju from sp_perintah_d where kode_lokasi='"+this.app._lokasi+"' "+
							"group by no_perintah "+
						") d on a.no_perintah = d.no_perintah "+						
						"left join ( "+
							"select no_perintah,count(*) as jum_input from sp_spj_m where kode_lokasi='"+this.app._lokasi+"' "+
							"group by no_perintah "+
						") e on a.no_perintah = e.no_perintah "+						
						"where a.nik_user='"+this.app._userLog+"' and  a.kode_lokasi ='"+this.app._lokasi+"' and a.no_batch ='-' and a.periode<='"+this.e_periode.getText()+"' "+
						"order by a.no_perintah";

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);						
	},							
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																			
			this.sg.appendData([line.no_perintah,line.status.toUpperCase(),line.tglawal,line.tglakhir,line.keterangan,line.asal,line.tujuan,floatToNilai(line.jum_aju),floatToNilai(line.jum_input)]); 
		}
		this.sg.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doLoadPD : function() {
		if (this.stsInput == "INPROG") {
			var strSQL = "select case when a.no_app2 = '-' then 'NONAPP' else 'APP' end as status,a.no_spj,a.no_perintah,a.nik_spj+' - '+a.nama_spj as nik "+
						",convert(varchar,b.tgl_mulai,103) as tglawal,convert(varchar,c.tgl_selesai,103) as tglakhir "+
						",datediff(day,b.tgl_mulai,c.tgl_selesai) + 1 as lama, a.no_app1,a.no_app2, a.nik_app1+' - '+isnull(d.nama,'-') as nik1, a.nik_app2+' - '+isnull(e.nama,'-') as nik2, "+
						"case  when a.progress = '0' then 'PENGAJUAN' "+
						"	   when a.progress = '1' then 'APPROVE ATASAN 1' "+
						"	   when a.progress = 'R' then 'REVISI ATASAN 1' "+
						"	   when a.progress = 'X' then 'REJECT ATASAN 1' "+

						"	   when a.progress = '2' then 'APPROVE ATASAN 2' "+
						"	   when a.progress = 'B' then 'REVISI ATASAN 2' "+
						"	   when a.progress = 'Z' then 'REJECT ATASAN 2' "+						
						"end as progress "+
						
						"from sp_spj_m a  "+
						
						"inner join ( "+
						"select no_spj,min(tgl_mulai) as tgl_mulai from sp_spj_dh where kode_lokasi = '"+this.app._lokasi+"' "+
						"group by no_spj "+
						") b on a.no_spj=b.no_spj "+
						
						"inner join ( "+
						"select no_spj,max(tgl_selesai) as tgl_selesai from sp_spj_dh where kode_lokasi = '"+this.app._lokasi+"' "+
						"group by no_spj "+
						") c on a.no_spj=c.no_spj "+

						"left join karyawan d on a.nik_app1 = d.nik and a.kode_lokasi=d.kode_lokasi "+
						"left join karyawan e on a.nik_app2 = e.nik and a.kode_lokasi=e.kode_lokasi "+
						
						"where a.no_perintah='"+this.noPerintah+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg2.appendData([line.status.toUpperCase(),line.no_spj,line.no_perintah,line.nik,line.tglawal,line.tglakhir,line.lama,line.nik1,line.no_app1,line.nik2,line.no_app2,line.progress.toUpperCase()]);
				}
			} else this.sg2.clear(1);
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
					sql.add("update sp_perintah_m set no_batch='"+this.noPerintah+"' where no_perintah='"+this.noPerintah+"' and kode_lokasi='"+this.app._lokasi+"'");	

					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)){
							
							if (this.sg2.cells(0,i) == "APP") var vProg = "1";
							else var vProg = "N";

							sql.add("update sp_spj_m set prog_batch='"+vProg+"' where no_spj='"+this.sg2.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
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
				this.standarLib.clearByTag(this, new Array("0","1","9"),undefined);			
				this.pc1.setActivePage(this.pc1.childPage[0]);							
				setTipeButton(tbSimpan);
				this.sg.clear(1);			
				this.sg2.clear(1);			
				this.doLoad();
				this.isiCBPerintah();				
				break;
			case "simpan" :					
			case "ubah" :					
				this.preView = "1";						
				var temuSalah = false;				
				for (var i=0;i < this.sg2.getRowCount();i++){
					if (this.sg2.rowValid(i)){
						var k = i+1;
						if (this.sg2.cells(0,i) == "APP" && this.sg2.cells(10,i) == "-") {
							system.alert(this,"Transaksi tidak valid.","Status APP belum APP2. (Baris:"+k+")");
							return false;
						}
					}
				}
				this.simpan();				
				break;								
			case "simpancek" : this.simpan();			
				break;
				
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();													
				sql.add("update sp_perintah_m set no_batch='-'  where no_perintah='"+this.noPerintah+"' and kode_lokasi='"+this.app._lokasi+"'");	
				sql.add("update sp_spj_m set prog_batch='0' where no_perintah='"+this.noPerintah+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		
		this.isiCBPerintah();				
		this.doLoad();		
	},	
	doChange:function(sender){				
		if (sender == this.cb_nb && this.cb_nb.getText() != "") {
			this.noPerintah = this.cb_nb.getText();	
			setTipeButton(tbUbahHapus);				
			this.pc1.setActivePage(this.pc1.childPage[0]);		
			var strSQL = 	"select a.no_perintah,'APP' as status "+
							",convert(varchar,a.tgl_mulai,103) as tglawal "+
							",convert(varchar,a.tgl_selesai,103) as tglakhir "+
							",a.keterangan "+
							",b.nama as asal "+
							",c.nama as tujuan "+
							",d.jum_aju "+
							",isnull(e.jum_input,0) as jum_input "+

							"from sp_perintah_m a "+
							"inner join sp_kota b on a.asal=b.kode_kota "+
							"inner join sp_kota c on a.tempat=c.kode_kota "+
							"inner join ( "+
								"select no_perintah,sum(jumlah+jum_driver) as jum_aju from sp_perintah_d where kode_lokasi='"+this.app._lokasi+"' "+
								"group by no_perintah "+
							") d on a.no_perintah = d.no_perintah "+						
							"left join ( "+
								"select no_perintah,count(*) as jum_input from sp_spj_m where kode_lokasi='"+this.app._lokasi+"' "+
								"group by no_perintah "+
							") e on a.no_perintah = e.no_perintah "+						
							"where a.kode_lokasi ='"+this.app._lokasi+"' and a.no_batch ='"+this.cb_nb.getText()+"'";

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);	
			
			var strSQL = "select case when a.prog_batch = '1' then 'APP' else 'NONAPP' end as status,a.no_spj,a.no_perintah,a.nik_spj+' - '+a.nama_spj as nik "+
						",convert(varchar,b.tgl_mulai,103) as tglawal,convert(varchar,c.tgl_selesai,103) as tglakhir "+
						",datediff(day,b.tgl_mulai,c.tgl_selesai) + 1 as lama, a.no_app1,a.no_app2, a.nik_app1+' - '+isnull(d.nama,'-') as nik1, a.nik_app2+' - '+isnull(e.nama,'-') as nik2, "+
						"case  when a.progress = '0' then 'PENGAJUAN' "+
						"	   when a.progress = '1' then 'APP1' "+
						"	   when a.progress = 'R' then 'REVISI APP1' "+
						"	   when a.progress = 'X' then 'REJECT APP1' "+

						"	   when a.progress = '2' then 'APP2' "+
						"	   when a.progress = 'B' then 'REVISI APP2' "+
						"	   when a.progress = 'Z' then 'REJECT APP2' "+						
						"end as progress "+

						"from sp_spj_m a  "+
						
						"inner join ( "+
						"select no_spj,min(tgl_mulai) as tgl_mulai from sp_spj_dh where kode_lokasi = '"+this.app._lokasi+"' "+
						"group by no_spj "+
						") b on a.no_spj=b.no_spj "+
						
						"inner join ( "+
						"select no_spj,max(tgl_selesai) as tgl_selesai from sp_spj_dh where kode_lokasi = '"+this.app._lokasi+"' "+
						"group by no_spj "+
						") c on a.no_spj=c.no_spj "+

						"left join karyawan d on a.nik_app1 = d.nik and a.kode_lokasi=d.kode_lokasi "+
						"left join karyawan e on a.nik_app2 = e.nik and a.kode_lokasi=e.kode_lokasi "+
						
						"where a.no_perintah='"+this.cb_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg2.appendData([line.status.toUpperCase(),line.no_spj,line.no_perintah,line.nik,line.tglawal,line.tglakhir,line.lama,line.nik1,line.no_app1,line.nik2,line.no_app2,line.progress.toUpperCase()]);
				}
			} else this.sg2.clear(1);

		}		
	},	
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);	
				this.noPerintah = this.sg.cells(0,row);
				this.stsInput = this.sg.cells(1,row);
				this.doLoadPD();				
			}
		} catch(e) {alert(e);}
	},		
	doDoubleClick2: function(sender, col , row) {
		if (this.sg2.cells(0,row) == "NONAPP") this.sg2.cells(0,row,"APP");
		else this.sg2.cells(0,row,"NONAPP");
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku3_sppd_rptAppSdm";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spj='"+this.e_nobukti.getText()+"' ";
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
								system.info(this,"Transaksi telah sukses tereksekusi (No SP : "+ this.noPerintah+")","");							
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),undefined);			
			this.pc1.setActivePage(this.pc1.childPage[0]);							
			setTipeButton(tbSimpan);
			this.sg.clear(1);			
			this.sg2.clear(1);			
			this.doLoad();
			this.isiCBPerintah();				
		} catch(e) {
			alert(e);
		}
	}
});

