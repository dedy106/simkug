window.app_saku3_transaksi_siaga_fRRAjuGra = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_fRRAjuGra.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_fRRAjuGra";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan RRA", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["List Pengajuan","Data Pengajuan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,		            
					colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Progress"],
					colWidth:[[4,3,2,1,0],[200,300,120,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
				
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[1],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});				
		
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[1,5,995,325], childPage:["Penerima","Pemberi","Cek Anggaran","Otorisasi"]});				
		this.cb_akunT = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Akun Penerima", multiSelection:false, maxLength:20, tag:9,change:[this,"doChange"]});		
		this.c_bulanT = new saiCB(this.pc1.childPage[0],{bound:[20,19,200,20],caption:"Bulan Penerima", items:["01","02","03","04","05","06","07","08","09","10","11","12"], tag:9,change:[this,"doChange"]}); 		
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Saldo", tag:9, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_terima = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Nilai Penerima", tag:9, tipeText:ttNilai, text:"0"});
		this.e_donor = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,200,20],caption:"Total Pemberi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:0,
		      colTitle:["Kode MTA","Nama MTA","Bulan","Saldo","Nilai"],
					colWidth:[[4,3,2,1,0],[100,100,100,350,80]],					
					columnReadOnly:[true,[1,3],[0,2,4]],
					colFormat:[[3,4],[cfNilai,cfNilai]],
					buttonStyle:[[0,2],[bsEllips,bsAuto]], 
					picklist:[[2],[new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]})]],
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});				
		
		this.sgG = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:6,tag:9,
		      colTitle:["Kode Akun","Nama Akun","Saldo Awal","Nilai","Saldo Akhir","Bulan"],
					colWidth:[[5,4,3,2,1,0],[100,100,100,100,150,80]],
					readOnly:true,colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgnG = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sgG});
		this.i_budget = new portalui_imageButton(this.sgnG,{bound:[955,2,20,20],hint:"Cek Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.cb_buat = new saiCBBL(this.pc1.childPage[3],{bound:[20,11,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});	
		this.cb_app = new saiCBBL(this.pc1.childPage[3],{bound:[20,12,220,20],caption:"NIK Approve ", multiSelection:false, maxLength:10, tag:2});						
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);	
		
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
			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='GARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			

			if (this.app._userStatus=="A")
			{
						var sql="select a.kode_akun,a.nama "+
								"from masakun a "+
								"where a.kode_lokasi='"+this.app._lokasi+"'   "; //and a.status_gar= '1'
						var sql2="select count(a.kode_akun) "+
								"from masakun a "+
								"where a.kode_lokasi='"+this.app._lokasi+"'  "; //and a.status_gar= '1'
			}
			else
			{
						var sql="select a.kode_akun,a.nama "+
								"from masakun a "+
								"inner join relakun_pp b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"inner join karyawan_pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi "+
								"where a.kode_lokasi='"+this.app._lokasi+"' and c.nik='"+this.app._userLog+"' and a.block= '0' "+
								"group by a.kode_akun,a.nama ";
						var sql2="select count(a.kode_akun) from (select a.kode_akun "+
								"from masakun a "+
								"inner join relakun_pp b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"inner join karyawan_pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi "+
								"where a.kode_lokasi='"+this.app._lokasi+"' and c.nik='"+this.app._userLog+"' and a.block= '0' "+
								"group by a.kode_akun) a ";	
			}
			this.cb_akunT.setSQL(sql,["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);		
			
			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			this.cb_buat.setText(this.app._userLog);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_fRRAjuGra.extend(window.childForm);
window.app_saku3_transaksi_siaga_fRRAjuGra.implement({
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
			var k=0;
			this.doHitungGar();
			for (var i=0;i < this.sgG.getRowCount();i++){
				if (nilaiToFloat(this.sgG.cells(3,i))>0 && nilaiToFloat(this.sgG.cells(2,i)) < nilaiToFloat(this.sgG.cells(3,i))) {
					var k =i+1;
					system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
					return false;						
				}
			}
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if (this.stsSimpan == 0) {
						sql.add("delete from anggaran_m where no_agg='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from anggaran_d where no_agg='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from rra_pdrk_m where no_pdrk='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from rra_pdrk_d where no_pdrk='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 					
					sql.add("insert into anggaran_m (no_agg,kode_lokasi,no_dokumen,tanggal,keterangan,tahun,kode_curr,nilai,tgl_input,nik_user,posted,no_del,nik_buat,nik_setuju,jenis) values  "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_periode.getText().substr(0,4)+"','IDR',"+parseNilai(this.e_donor.getText())+",getdate(),'"+this.app._userLog+"','T','-','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','RR')");					
					sql.add("insert into rra_pdrk_m(no_pdrk,kode_lokasi,keterangan,kode_pp,kode_bidang,jenis_agg,tanggal,periode,nik_buat,nik_app1,nik_app2,nik_app3,sts_pdrk,justifikasi, nik_user, tgl_input,progress,modul) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','-','-','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.cb_app.getText()+"','"+this.cb_app.getText()+"','RRR','-','"+this.app._userLog+"',getdate(),'0','MULTI')");
					var periode ="";
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								periode = this.e_periode.getText().substr(0,4)+this.sg.cells(2,i);
								sql.add("insert into rra_pdrk_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,periode,saldo,nilai,dc,target) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"','-','-','"+periode+"',"+parseNilai(this.sg.cells(3,i))+","+parseNilai(this.sg.cells(4,i))+",'C','-')");
								sql.add("insert into anggaran_d(no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul) values "+		
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'-','"+this.sg.cells(0,i)+"','-',1,'"+periode+"',"+parseNilai(this.sg.cells(4,i))+","+parseNilai(this.sg.cells(4,i))+",'C','-','"+this.app._userLog+"',getdate(),'RRA')");
							}
						}
					}
					periode = this.e_periode.getText().substr(0,4)+this.c_bulanT.getText();
					sql.add("insert into rra_pdrk_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,periode,saldo,nilai,dc,target) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',999,'"+this.cb_akunT.getText()+"','-','-','"+periode+"',0,"+nilaiToFloat(this.e_terima.getText())+",'D','-')");
					
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
					this.sg.clear(1); 					
					this.sgG.clear(1); 
					setTipeButton(tbAllFalse);								
					this.doLoad3();
					this.pc2.setActivePage(this.pc2.childPage[0]);				
					this.pc1.setActivePage(this.pc1.childPage[0]);				
				break;
			case "simpan" :					
			case "ubah" :	
				this.preView = "1";
				for (var i=0;i < this.sg.getRowCount();i++){					
					if (!this.sg.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg.getColCount();j++){
							if (this.sg.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
							return false;
						}
					}					
				}															
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				if (nilaiToFloat(this.e_terima.getText()) != nilaiToFloat(this.e_donor.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Terima dan Pemberi tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_terima.getText()) <= 0 || nilaiToFloat(this.e_donor.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Terima atau Pemberi tidak boleh nol atau kurang.");
					return false;						
				}
				if (this.app._periode.substr(0,4) > this.e_periode.getText().substr(0,4)){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi harus dalam tahun anggaran yang sama.["+this.app._periode.substr(0,4)+"]");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();					
				sql.add("delete from anggaran_m where no_agg='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from anggaran_d where no_agg='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from rra_pdrk_m where no_pdrk='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from rra_pdrk_d where no_pdrk='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		
		if (this.stsSimpan == 1) this.doClick();
		this.doLoad3();		
	},	
	doChange:function(sender){																		
		try{
			if (sender == this.c_bulanT || sender == this.cb_akunT) {				
				this.e_saldo.setText("0");
				if (this.cb_akunT.getText()!="" && this.c_bulanT.getText()!="") {
					var data = this.dbLib.getDataProvider("select fn_cekagg8('"+this.app._lokasi+"','"+this.cb_akunT.getText()+"','"+this.e_periode.getText().substr(0,4)+this.c_bulanT.getText()+"','"+this.e_nb.getText()+"') as gar ",true);					
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];
						data = line.gar.split(";");
						sls = parseFloat(data[0]) - parseFloat(data[1]);
						this.e_saldo.setText(floatToNilai(sls));				
					}
				}				
			}		
		}
		catch(e) {
			alert(e);
		}
	},	
	doClick:function(sender){
		if (this.stsSimpan == 0)  {
			this.standarLib.clearByTag(this, new Array("9"),undefined);			
			this.sg.clear(1);
			this.sg2.clear(1);			
			this.sgG.clear(1);						
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"anggaran_m","no_agg",this.app._lokasi+"-RRA"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_dok.setFocus();
		setTipeButton(tbSimpan);			
	},		
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){					
					totC += nilaiToFloat(this.sg.cells(4,i));
				}
			}						
			this.e_donor.setText(floatToNilai(totC));
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
								this.nama_report = "server_report_saku3_siaga_rptAggPdrk";
								this.filter = " where a.kode_lokasi='" + this.app._lokasi + "' and a.no_pdrk='" + this.e_nb.getText() + "' ";
								this.filter2 = "";
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report, this.filter, 1, this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report, this.filter, 1, 1, this.showFilter, this.app._namalokasi, this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc2.hide();								
							}
							else {
								system.info(this, "Transaksi telah sukses tereksekusi (No Bukti : " + this.e_nb.getText() + ")", "");
								this.clearLayar();
							}
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);			
			this.sg.clear(1); 
			this.sgG.clear(1); 
			setTipeButton(tbAllFalse);								
			this.doLoad3();
			this.pc2.setActivePage(this.pc2.childPage[0]);				
			this.pc1.setActivePage(this.pc1.childPage[0]);				
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){
																							
		var strSQL = "select a.no_pdrk,convert(varchar,a.tanggal,103) as tgl,b.no_dokumen,a.keterangan,a.progress "+
		             "from rra_pdrk_m a inner join anggaran_m b on a.no_pdrk=b.no_agg and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.modul = 'MULTI' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('0','X') order by a.tanggal";		
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
			this.sg3.appendData([line.no_pdrk,line.tgl,line.no_dokumen,line.keterangan,line.progress]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));																				
							
				var strSQL = "select b.no_dokumen,a.nik_app1,a.tanggal,a.keterangan,a.nik_buat "+
				             "from rra_pdrk_m a inner join anggaran_m b on a.no_pdrk=b.no_agg and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_pdrk='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.cb_app.setText(line.nik_app1);	
						this.cb_buat.setText(line.nik_buat);					
						this.dp_d1.setText(line.tanggal);	
						this.e_dok.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);						
					}
				}

				var strSQL = "select substring(a.periode,5,2) as bulan,a.kode_akun,c.nama as nama_akun,a.nilai "+
							 "from rra_pdrk_d a "+
							 "				    inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+							
							 "where a.no_pdrk='"+this.e_nb.getText()+"' and a.dc ='C' ";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear(1);
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_akun,line.nama_akun,line.bulan,"0",floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);								
				var strSQL = "select substring(a.periode,5,2) as bulan,a.kode_akun,a.nilai "+
							 "from rra_pdrk_d a "+
							 "where a.no_pdrk='"+this.e_nb.getText()+"' and a.dc ='D' ";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];							
					this.cb_akunT.setText(line.kode_akun);
					this.c_bulanT.setText(line.bulan);
					this.e_terima.setText(floatToNilai(line.nilai));
				} else this.sg.clear(1);								
			}									
		} catch(e) {alert(e);}
	},
	doHitungGar: function(){
		this.sgG.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i)){
				nilai = nilaiToFloat(this.sg.cells(4,i));				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sgG.getRowCount();j++){
					if (this.sg.cells(0,i) == this.sgG.cells(0,j) && this.sg.cells(2,i) == this.sgG.cells(5,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sgG.appendData([this.sg.cells(0,i),this.sg.cells(1,i),"0",floatToNilai(nilai),"0",this.sg.cells(2,i)]);
				} 
				else { 
					total = nilaiToFloat(this.sgG.cells(3,idx));
					total = total + nilai;
					this.sgG.setCell(3,idx,total);
				}
			}
		}
		
		var sls = 0;
		var tahun = this.e_periode.getText().substr(0,4);
		for (var i=0;i < this.sgG.getRowCount();i++){					
			if (this.sgG.rowValid(i)){
				var data = this.dbLib.getDataProvider("select fn_cekagg8('"+this.app._lokasi+"','"+this.sgG.cells(0,i)+"','"+this.e_periode.getText().substr(0,4)+this.sgG.cells(5,i)+"','"+this.e_nb.getText()+"') as gar ",true);									
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					data = line.gar.split(";");
					sls = parseFloat(data[0]) - parseFloat(data[1]);
					this.sgG.cells(2,i,floatToNilai(sls));
					sls = sls - nilaiToFloat(this.sgG.cells(3,i));
					this.sgG.cells(4,i,floatToNilai(sls));
				}
			}
		}
	},	
	doChangeCell: function(sender, col, row){
		if ((col == 2 || col == 4) && (this.sg.cells(4,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (this.sg.cells(0,row) != "") {
				var data = this.dbLib.getDataProvider("select nama from masakun where kode_lokasi='"+this.app._lokasi+"' and kode_akun='"+this.sg.cells(0,row)+"' ",true);													
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];					
					this.sg.cells(1,row,line.nama);				
				}
				else this.sg.cells(1,row,"");							
			}
		}
		
		if (col == 0 || col == 2) {
			if (sender.cells(0,row) != "" && sender.cells(2,row) != "") {
				var totSeb = 0;				
				for (var j=0; j < this.sg.getRowCount();j++){
					if (j < row && sender.cells(0,row) == this.sg.cells(0,j) && sender.cells(2,row) == this.sg.cells(2,j)) {
						totSeb += nilaiToFloat(this.sg.cells(4,j));
					}
				}																
				var data = this.dbLib.getDataProvider("select fn_cekagg8('"+this.app._lokasi+"','"+this.sg.cells(0,row)+"','"+this.e_periode.getText().substr(0,4)+this.sg.cells(2,row)+"','"+this.e_nb.getText()+"') as gar ",true);													
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					data = line.gar.split(";");
					sls = parseFloat(data[0]) - parseFloat(data[1]);
					sls = sls - totSeb;
					this.sg.cells(3,row,floatToNilai(sls));				
				}						
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					if (this.app._userStatus=="A")
					{
						var sql="select a.kode_akun,a.nama "+
								"from masakun a "+
								"where a.kode_lokasi='"+this.app._lokasi+"'  and a.block= '0' ";
						var sql2="select count(a.kode_akun) "+
								"from masakun a "+
								"where a.kode_lokasi='"+this.app._lokasi+"' and a.block= '0' ";
					}
					else
					{
						var sql="select a.kode_akun,a.nama "+
								"from masakun a "+
								"inner join relakun_pp b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"inner join karyawan_pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi "+
								"where a.kode_lokasi='"+this.app._lokasi+"' and c.nik='"+this.app._userLog+"' and a.block= '0' "+
								"group by a.kode_akun,a.nama ";
						var sql2="select count(a.kode_akun) from (select a.kode_akun "+
								"from masakun a "+
								"inner join relakun_pp b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"inner join karyawan_pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi "+
								"where a.kode_lokasi='"+this.app._lokasi+"' and c.nik='"+this.app._userLog+"' and a.block= '0' "+
								"group by a.kode_akun) a ";	
					}
					this.standarLib.showListData(this, "Daftar Mata Anggaran",sender,undefined,sql,sql2,
												  ["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}				
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	}	
});
