window.app_saku3_transaksi_yakes21_panjar_fAppGar = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_yakes21_panjar_fAppGar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_panjar_fAppGar";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Approve Panjar - Pertanggungan", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,440], childPage:["Daftar Bukti","Detail Bukti","Filter Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:9,tag:0,
		            colTitle:["Pilih","No Pengajuan","Status","Tanggal","PP / Unit","Deskripsi","Nilai","Pemegang PJ","No App"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,300,150,70,80,100,70]],                    
					readOnly:true,colFormat:[[0,6],[cfButton,cfNilai]],
					click:[this,"doSgBtnClick"], colAlign:[[0],[alCenter]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
				
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Status",items:["APPROVE","RETURN"], readOnly:true,tag:0});
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"No App", readOnly:true,visible:false});								
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,10,550,60],caption:"Catatan",tag:9,readOnly:true});						
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"No Pengajuan", readOnly:true});						
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,12,450,20],caption:"Deskripsi", readOnly:true});					
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Tgl Bukti", readOnly:true});
		this.e_buat = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,13,220,20],caption:"Pembuat", readOnly:true});		
		this.e_tglkui = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Tgl Kuitansi", readOnly:true});		
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,14,220,20],caption:"Nilai Netto", readOnly:true, tipeText:ttNilai, text:"0"});						
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,18,996,252], childPage:["Controlling","Item Jurnal","File Dok","Cattn Verf."]});			
		this.sg2 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:8,tag:9,
					colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,200,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7],[cfNilai,cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2});
				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:9,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,290,50,200,80]],								
					readOnly:true,														
					colFormat:[[4],[cfNilai]],
					nilaiChange:[this,"doNilaiChange3"],
					autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3});					

		this.sgUpld = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","DownLoad"],
					colWidth:[[3,2,1,0],[80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3],[]],					
					colFormat:[[3],[cfButton]], 
					click:[this,"doSgBtnClickUpld"], colAlign:[[3],[alCenter]],
					readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});		
		this.sgnUpld = new sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height - 25,this.pc2.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgctt = new saiGrid(this.pc2.childPage[3],{bound:[1,5,this.pc2.width-12,this.pc2.height-15],colCount:1,tag:9, 
					colTitle:["Catatan"],
					colWidth:[[0],[100]],					
					readOnly:true,autoAppend:false,defaultRow:1});					        

		this.cb_nb = new saiCBBL(this.pc1.childPage[2],{bound:[20,12,220,20],caption:"No Pengajuan", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});

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
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	
			
			this.stsSimpan = 1;
            this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);	
			this.doLoad();	  
			this.doLoadCtt(this.e_nobukti.getText());    
			
		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_yakes21_panjar_fAppGar.extend(window.childForm);
window.app_saku3_transaksi_yakes21_panjar_fAppGar.implement({					
	doSgBtnClickUpld: function(sender, col, row){
		try{
			if (col === 3) window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},				
	doNilaiChange3: function(){		
		try{
			var totDC = 0;
			for (var i = 0; i < this.sg3.getRowCount();i++){
				if (this.sg3.rowValid(i) && this.sg3.cells(4,i) != ""){
					if (this.sg3.cells(2,i).toUpperCase() == "D") totDC += nilaiToFloat(this.sg3.cells(4,i));
					if (this.sg3.cells(2,i).toUpperCase() == "C") totDC -= nilaiToFloat(this.sg3.cells(4,i));
				}
			}			
			this.e_nilai.setText(floatToNilai(totDC));
		}catch(e)
		{
			alert("doNilaiChange3: "+e);
		}		
	},		
	doNilaiChange1: function(){		
		try{
			var tot = 0;
			for (var i = 0; i < this.sg2.getRowCount();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){
					tot += nilaiToFloat(this.sg2.cells(4,i)) - nilaiToFloat(this.sg2.cells(5,i));
				}
			}
			this.e_nilairek.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("doNilaiChange3: "+e);
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
					if (this.c_status.getText() == "APPROVE") var vStatus = "1"; else var vStatus = "R";
					
					sql.add("update pbh_ver_m set no_flag='"+this.e_nb.getText()+"' where no_bukti='"+this.e_nobukti.getText()+"' and no_flag='-' and form='IFAPP' and modul='IF' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into pbh_ver_m (no_ver,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag,nik_bdh,nik_fiat) values "+
                            "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+vStatus+"','IF','IFAPP','"+this.e_nobukti.getText()+"','"+this.e_memo.getText()+"','-','X','X')");
                    													
				    sql.add("update if_aju_m set no_app='"+this.e_nb.getText()+"',progress='"+vStatus+"' where no_aju='"+this.e_nobukti.getText()+"' ");							 
					
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
					this.sg2.clear(1); this.sg3.clear(1); this.sgUpld.clear(1);
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.e_memo.setText("");
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :	
			case "ubah" :					
				this.preView = "1";												
				this.simpan();				
				break;								
			case "simpancek" : this.simpan();			
				break;
				
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();									
				sql.add("delete from pbh_ver_m where no_ver='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");				
				sql.add("update if_aju_m set no_app='-',progress='0' where no_aju='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
				setTipeButton(tbAllFalse);					
				this.dbLib.execArraySQL(sql);				
				break;					
		}
	},
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			this.e_periode.setText(y+""+m);	

			if (this.stsSimpan == 1) {
				this.doClick();		
				
				//nik--login
				this.cb_nb.setSQL(
					"select a.no_ptg, a.keterangan from panjarptg2_m a "+
					"inner join karyawan_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi and c.nik ='"+this.app._userLog+"' "+
					"where a.nik_app='"+this.app._userLog+"' and a.periode<='"+this.e_periode.getText()+"' and a.progress in ('1','R')  "
					,["a.no_ptg","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Pengajuan",true);				
			}
		}
		catch(e) {
			alert(e);
		}
	},	
	doChange:function(sender){										
		if (sender == this.cb_nb && this.cb_nb.getText() != "") {
			var strSQL = "select a.no_ptg,case a.progress when '1' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,a.kode_pp+' | '+b.nama as pp,a.keterangan,a.nilai,a.nik_buat as pemegang,a.no_app "+ 
						 "from panjarptg2_m a "+
						 "	   inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+						 
						 "where a.progress in ('1','R') and a.no_ptg='"+this.cb_nb.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			
			this.pc1.setActivePage(this.pc1.childPage[0]);				
		}
	},
	doClick:function(sender){		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pbh_ver_m","no_ver",this.app._lokasi+"-APG"+this.e_periode.getText().substr(2,4)+".","0000"));												
		this.e_memo.setFocus();								
    },	
    doSgBtnClick: function(sender, col, row){
		try{
			if (col === 0) {
				this.doDoubleClick(this.sg2,1,row);
			}
		}catch(e){
			alert(e);
		}
	},	
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(1,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);											
				if (this.sg.cells(2,row) == "RETURN") this.c_status.setText(this.sg.cells(2,row));								
				else this.c_status.setText("APPROVE");		

				this.e_nobukti.setText(this.sg.cells(1,row));					                											
				this.e_tgl.setText(this.sg.cells(3,row));
				this.e_tglkui.setText(this.sg.cells(8,row));
				this.e_ket.setText(this.sg.cells(5,row));						
				this.e_buat.setText(this.sg.cells(7,row));										
				this.e_memo.setText(this.sg.cells(5,row));
				this.noVerLama = this.sg.cells(9,row);
				
				this.doLoadCtt(this.e_nobukti.getText());      
				this.doLoadGar();
				this.doLoadJurnal();
				
				this.sgUpld.clear();
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from pbh_dok a inner join pbh_dok_ver b on a.kode_jenis=b.kode_jenis "+							 
							 "where a.no_bukti = '"+this.e_nobukti.getText()+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar,"DownLoad"]);						
					}
				} else this.sgUpld.clear(1);
				
				if (this.sg.cells(2,row) == "INPROG") {
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				}
				else {
					setTipeButton(tbHapus);
					this.stsSimpan = 0;
					var str = "select catatan from pbh_ver_m where no_ver ='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'";
					var data = this.dbLib.getDataProvider(str,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];																		
						this.e_memo.setText(line.catatan);	
					}
				}				
			}
		} catch(e) {alert(e);}
	},		
	doLoadGar:function(){	
		var strSQL2 = "select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_drk,d.nama as nama_drk,a.saldo,a.nilai "+
					  "from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					  "				 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
					  "				 inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode1,1,4)=d.tahun "+
					  "where no_bukti='"+this.e_nobukti.getText()+"'";
		var data = this.dbLib.getDataProvider(strSQL2,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.sg2.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,floatToNilai(line.saldo),floatToNilai(line.nilai)]);
			}
		} else this.sg2.clear(1);	
	},
	doLoadJurnal:function(){						  
		var strSQL3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
					"from if_aju_j a "+
					"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"     inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+	
					"     left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+																															  
					"where a.jenis <> 'HUTIF' and a.no_aju = '"+this.e_nobukti.getText()+"' order by a.dc desc";									
		var data = this.dbLib.getDataProvider(strSQL3,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg3.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.sg3.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
			}
		} else this.sg3.clear(1);			
		this.sg3.validasi();			
	},	
	doLoad:function(sender){			
		strSQL = "select a.no_ptg,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,a.kode_pp+' | '+b.nama as pp,a.keterangan,a.nilai,a.nik_buat as pemegang,a.no_app "+
				 "from panjarptg2_m a "+
				 "	inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
				 "	inner join karyawan_pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi and c.nik ='"+this.app._userLog+"' "+
				 "where a.progress='0' order by a.no_ptg";                                
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
			this.sg.appendData(["Pilih",line.no_ptg,line.status.toUpperCase(),line.tgl,line.pp,line.keterangan,floatToNilai(line.nilai),line.pembuat,line.no_app]); 
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
								// this.nama_report="server_report_saku3_pbh_ypt_rptVer";									                  
								// this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ver='"+this.e_nb.getText()+"' ";
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
			this.sg2.clear(1); this.sg3.clear(1); 
			this.sgUpld.clear(1); 
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);				
			this.e_memo.setText("");
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	},
	doLoadCtt: function(kode){
		try{
			var strSQL = "select distinct convert(varchar,tanggal,103) as tgl,tanggal "+
						 "from pbh_ver_m "+
						 "where no_bukti='"+kode+"' and no_ver<>'"+this.noAppLama+"' "+
						 "order by convert(varchar,tanggal,103) desc";	
			
			var Html = "<link rel='stylesheet' type='text/css' href='bs/css/bootstrap.min.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/AdminLTE.min.css'>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/font-awesome.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/ionicons.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/sai.css'/>"+
			"<script type='text/javascript' src='server/bs/js/jquery.min.js'></script>"+
			"<script type='text/javascript' src='server/bs/js/bootstrap.min.js'></script>"+
			"<div style='padding-top: 10px;padding-left: 10px;max-height: 350px;margin-right:0px' class='row sai-container-overflow'>"+
			"<div class='col-md-6'>"+
			"  <ul class='timeline' style='padding-bottom:10px'>";
		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					var strSQL2 = "select catatan,no_ver, convert(varchar,tanggal,103) as tgl,tanggal, convert(varchar,tgl_input,108) as jam,nik_user "+
								  "from pbh_ver_m "+
								  "where no_bukti='"+kode+"' and tanggal='"+line.tanggal+"' and no_ver<>'"+this.noAppLama+"' "+
								  "order by tanggal desc,convert(varchar,tgl_input,108) desc ";	

					var outerHtml2 = "";
					var data2 = this.dbLib.getDataProvider(strSQL2,true);
					if (typeof data2 == "object" && data.rs.rows[0] != undefined){
						var line2;
						for (var x in data2.rs.rows){
							line2 = data2.rs.rows[x];	
							outerHtml2 += "<!-- timeline item -->"+
							"    <li>"+
							"      <i class='fa fa-envelope bg-blue'></i>"+
							"      <div class='timeline-item' style='box-sizing: border-box;border: 1px solid #dedcdc;'>"+
							"        <span class='time'><i class='fa fa-clock-o'></i>"+line2.jam+"</span>"+
							"        <h3 class='timeline-header'>"+line2.no_ver+" - ["+line2.nik_user+"]</h3>"+
							"        <div class='timeline-body' style='box-sizing: border-box;'>"+line2.catatan+
							"        </div>"+
							"        <div class='timeline-footer' style='box-sizing: border-box;'>"+
							"        </div>"+
							"      </div>"+
							"    </li>"+
							"    <!-- END timeline item -->";
						}
					}		

					Html +=
					"    <li class='time-label'>"+
					"          <span class='bg-red'>"+line.tgl+"          </span>"+
					"    </li>"+
					"    <!-- /.timeline-label -->"+outerHtml2;
				}

				Html +="<li>"+
									"		<i class='fa fa-clock-o bg-gray'></i>"+
									"</li>"+
									"</ul>"+
							"</div>"+
				"<!-- /.col -->"+
				"</div>";

			}else{
				Html += "Catatan tidak ditemukan";
		  }
	
		this.sgctt.setInnerHTML(Html);
		}catch(e) {alert(e);}
					
	}
});

