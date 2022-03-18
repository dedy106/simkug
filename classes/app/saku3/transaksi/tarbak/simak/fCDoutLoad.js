window.app_saku3_transaksi_tarbak_simak_fCDoutLoad = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_simak_fCDoutLoad.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_simak_fCDoutLoad";
		this.itemsValue = new arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengeluaran PDD Siswa [Load]", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.cb_pp = new saiCBBL(this,{bound:[20,18,220,20],caption:"Sekolah", readOnly:true, maxLength:10, tag:2, change:[this,"doChange"]});
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data PDD","List Bukti"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:3,tag:9,
		            colTitle:["No Rekon","Tanggal","Deskripsi"],
					colWidth:[[2,1,0],[400,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});							
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2 });
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Nilai Keluar", tag:1, tipeText:ttNilai, readOnly:true, text:"0"});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,335], childPage:["Filter Data","Data PDD","Data Pengeluaran","Error Msg"]});
		this.cb_tingkat = new saiCBBL(this.pc1.childPage[0],{bound:[20,10,220,20],caption:"Tingkat", multiSelection:false, maxLength:10, tag:9 });	
		this.bTampil = new button(this.pc1.childPage[0],{bound:[120,17,96,20],caption:"Data PDD",click:[this,"doTampil"]});			

		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:9,
					colTitle:["NIS","Nama","Saldo PDD","Nilai"],					
					colWidth:[[3,2,1,0],[100,100,350,120]],					
					colFormat:[[2,3],[cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3],[]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});	

		this.sg1 = new portalui_saiGrid(this.pc1.childPage[2],{bound:[1,5,500,this.pc1.height-33],colCount:3,tag:9,
					colTitle:["NIS","Nilai","Validasi"],
					colWidth:[[2,1,0],[200,100,150]],
					colFormat:[[1],[cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 
					readOnly:true, defaultRow:1
					});							
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager1"]});		
		
		this.sg2 = new portalui_saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-10],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});	

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	

		this.bRekon = new button(this.pc1.childPage[2],{bound:[550,10,96,20],caption:"Rekon PDD",click:[this,"doRekon"]});			
		
		setTipeButton(tbSimpan);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);
			this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun Pelunasan",true);

			var data = this.dbLib.getDataProvider("select akun_cd from pp where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.akunCD = line.akun_cd;
			} else this.akunCD = "";

			if (this.akunCD == "" || this.akunCD == "-") {
				system.alert(this,"Akun CD belum di seting di Form PP.","");
			}

			this.cb_tingkat.setSQL("select kode_tingkat, nama from sis_tingkat where kode_lokasi='"+this.app._lokasi+"'",["kode_tingkat","nama"],false,["Kode","Nama"],"and","Data Tingkat",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_simak_fCDoutLoad.extend(window.childForm);
window.app_saku3_transaksi_tarbak_simak_fCDoutLoad.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();										
		} catch(e) {alert(e);}
	},
	doPager1: function(sender,page){
		this.sg1.doSelectPage(page);
	},	
	doCekDataSiswa: function() {
		//cek nis
		var strSQL = "select nis from sis_siswa where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"' ";					 
		
		var dataS = this.dbLib.getDataProvider(strSQL,true);
		if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
			this.dataNIS = dataS;
		}				
		this.inValid = false;
		for (var i=0; i < this.sg1.getRowCount();i++){
			this.sg1.cells(2,i,"NIS INVALID");
			for (var j=0;j < this.dataNIS.rs.rows.length;j++){
				if (this.sg1.cells(0,i) == this.dataNIS.rs.rows[j].nis) {					
					this.sg1.cells(2,i,"VALID");				
				}
			}	
			if (this.sg1.cells(2,i) == "NIS INVALID") this.inValid = true;									
		}	

		this.sg2.clear();
		for (var i=0; i < this.sg1.getRowCount();i++) {
			if (this.sg1.cells(2,i) == "NIS INVALID") {
				var j = i+1;
				this.sg2.appendData([j]);						
			}
		}
	},
	doRekon:	function(sender){				
		try {
			this.doCekDataSiswa();
			if (this.inValid) {				
				this.pc1.setActivePage(this.pc1.childPage[2]);	
				system.alert(this,"Data tidak valid.","Terdapat data siswa yang tidak terdaftar NIS-nya.");
				return false;										
			} 
			else {
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					this.dataJU.rs.rows[i].nilai = 0;				
				}	

				for (var i=0; i < this.sg1.getRowCount();i++){													
					for (var j=0;j < this.dataJU.rs.rows.length;j++){
						if (this.sg1.cells(0,i) == this.dataJU.rs.rows[j].nis) {
							if (parseFloat(this.dataJU.rs.rows[j].saldo_cd) >= nilaiToFloat(this.sg1.cells(1,i))) {								
								this.dataJU.rs.rows[j].nilai = nilaiToFloat(this.sg1.cells(1,i));
								break;
							}		
							else {
								this.sg1.cells(2,i,this.sg1.cells(2,i)+" | SALDO KURANG");	
								this.inValid = true;
								setTipeButton(tbAllFalse);														
							}
						}
					}	

				}
			
				var tot = 0;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					tot = tot + parseFloat(line.nilai);				
				}
				this.e_nilai.setText(floatToNilai(tot));
				
				this.pc1.setActivePage(this.pc1.childPage[1]);			
				this.doTampilData(1);	
			}		
		}
		catch(e) {
			alert(e);
		}
	},
	doTampil: function() {
		if (this.cb_tingkat.getText()!="") var vTingkat = " and c.kode_tingkat = '"+this.cb_tingkat.getText()+"' ";
		else var vTingkat = " ";

		var strSQL = "select b.nis,b.nama,isnull(sum(case a.dc when 'D' then a.nilai else -a.nilai end),0) as saldo_cd, 0 as nilai "+
						"from sis_cd_d a inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi "+						 
						"				  inner join sis_kelas c on b.kode_kelas=c.kode_kelas and c.kode_lokasi=b.kode_lokasi "+
						"				  inner join sis_siswa_status d on b.flag_aktif=d.kode_ss and d.kode_lokasi=b.kode_lokasi and d.flag_aktif='1' "+
						"where b.kode_lokasi='"+this.app._lokasi+"' "+vTingkat+"  and a.kode_pp='"+this.cb_pp.getText()+"' "+
						"group by b.nis,b.nama";												

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;				
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);

			this.pc1.setActivePage(this.pc1.childPage[1]);					
		} else this.sg.clear(1);
				
	},
	doTampilData: function(page) {
		var line;
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.nis,line.nama,floatToNilai(line.saldo_cd),floatToNilai(line.nilai)]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");						
						sql.add("delete from sis_cd_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,akun_kb,no_bg,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','"+this.cb_akun.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_pp.getText()+"','CDOUTLOAD','BK','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','-','-','-')");																
					
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.akunCD+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','-','-','-','"+this.app._lokasi+"','CDOUTLOAD','CD','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+parseNilai(this.e_nilai.getText())+")");
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','-','-','-','"+this.app._lokasi+"','CDOUTLOAD','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+parseNilai(this.e_nilai.getText())+")");
				
					for (var j=0;j < this.dataJU.rs.rows.length;j++){
						if (parseFloat(this.dataJU.rs.rows[j].nilai) > 0) {		
							sql.add("insert into sis_cd_d(no_bukti,nis,periode,nilai,kode_lokasi,akun_cd,kode_param,dc,modul,kode_pp,no_ref1) values "+
									"('"+this.e_nb.getText()+"','"+this.dataJU.rs.rows[j].nis+"','"+this.e_periode.getText()+"',"+parseFloat(this.dataJU.rs.rows[j].nilai)+",'"+this.app._lokasi+"','"+this.akunCD+"','-','C','CDOUTLOAD','"+this.cb_pp.getText()+"','-')");
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
					this.sg3.clear(1); this.sg.clear(1); this.sg1.clear(1); this.sg2.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);	
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					if (this.stsSimpan == 1) this.doClick(this.i_gen);								
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
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
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;						
			case "hapus" :					
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");						
					sql.add("delete from sis_cd_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		//lama
		//if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		//else this.e_periode.setText(this.app._periode);

		//baru
		this.e_periode.setText(y+""+m)
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			 			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-BK"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
			this.stsSimpan = 1;
		}
	},
	doChange: function(sender){
		
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {
								this.nama_report="server_report_saku3_siswa_rptCdOut";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
								this.filter2 = this.filter2;
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
								this.pc2.hide();
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
				this.pc2.show();
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
			this.sg3.clear(1); this.sg.clear(1); this.sg1.clear(1); this.sg2.clear(1);  
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			if (this.stsSimpan == 1) this.doClick(this.i_gen);			
			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																
		var strSQL = "select a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.keterangan "+
		             "from kas_m a "+
					 "where a.kode_pp='"+this.cb_pp.getText()+"' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'CDOUTLOAD' and a.posted ='F'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_kas,line.tgl,line.keterangan]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select * from kas_m "+
							 "where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){										
						this.cb_pp.setText(line.kode_pp);	
						this.e_ket.setText(line.keterangan);
						this.cb_akun.setText(line.akun_kb);	
						this.e_nilai.setText(floatToNilai(line.nilai));							
					}
				}				
			}						
		} catch(e) {alert(e);}
	}
});