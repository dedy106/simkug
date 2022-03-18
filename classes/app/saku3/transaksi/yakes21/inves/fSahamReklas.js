window.app_saku3_transaksi_yakes21_inves_fSahamReklas = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_inves_fSahamReklas.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_inves_fSahamReklas";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Reklas Jenis Saham", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Reklas","List Reklas"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Pilih"],
					colWidth:[[4,3,2,1,0],[70,100,350,80,100]],
					colFormat:[[3,4],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,452,20],caption:"Deskripsi", maxLength:150});						
		this.cb_drk = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Kode DRK", multiSelection:false, maxLength:10, tag:2, visible:false});						
		this.cb_plan = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Plan Asset", multiSelection:false, maxLength:10, tag:2,readOnly:true,change:[this,"doChange"]});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,13,200,20],caption:"Nilai Saham", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_kelola = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Pengelola", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		this.e_spi = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,12,200,20],caption:"Nilai SPI", tag:1,  tipeText:ttNilai, text:"0",readOnly:true});		 
		this.bTampil = new portalui_button(this.pc2.childPage[0],{bound:[670,12,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,22,996,305], childPage:["Data Saham"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:10,tag:0,				
				colTitle:["Kd Saham","Nama Saham","Lbr Unit","Harga Oleh","Harga Buku","Harga Wajar","Tgl Jual","Jenis","Nilai Saham","Nilai SPI"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,100,80,80,100,120,120,100,170,60]],
				readOnly:true,
				colFormat:[[2,3,4,5,8,9],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],								
				nilaiChange:[this,"doNilaiChange"],				
				defaultRow:1,autoAppend:true,
				});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPage"]});				
						
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
				
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
									
			this.cb_plan.setSQL("select kode_plan, nama from inv_plan",["kode_plan","nama"],false,["Kode","Nama"],"where","Daftar Plan Asset",true);			
			this.cb_kelola.setSQL("select kode_kelola, nama from inv_kelola where flag_aktif='1'",["kode_kelola","nama"],false,["Kode","Nama"],"and","Daftar Pengelola",true);							
			
			this.cb_plan.setText("");
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PLAN') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "PLAN") this.cb_plan.setText(line.flag);																										
				}
			}

			var data = this.dbLib.getDataProvider("select convert(varchar,getdate(),103) as tglnow ",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];					
				this.tglNow = line.tglnow;
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_inves_fSahamReklas.extend(window.childForm);
window.app_saku3_transaksi_yakes21_inves_fSahamReklas.implement({
	doLoadData: function() {
		this.nik_user=this.app._nikUser;						
		var sql = "call sp_get_hsaham ('"+this.cb_plan.getText()+"','"+this.cb_kelola.getText()+"', '"+this.e_periode.getText()+"','"+this.nik_user+"','"+this.e_nb.getText()+"')";					
		this.dbLib.execQuerySync(sql);	
			
		this.sg.clear();
		var strSQL = "select a.kode_saham,c.nama,a.jumlah,a.h_oleh,a.h_buku,d.h_wajar,b.tgl_jual,b.jenis, round(d.h_wajar * a.jumlah,0) as nilai, round(((d.h_wajar-a.h_buku) * a.jumlah),0) - isnull(e.spi_rev,0) as ni_spi "+
					 "from inv_saham_tmp a "+
					 "inner join inv_saham_d b on a.kode_saham=b.kode_saham and a.kode_kelola=b.kode_kelola and a.kode_plan=b.kode_plan "+
					 "inner join inv_saham c on a.kode_saham=c.kode_saham "+
					 "inner join inv_shmspi_d d on a.kode_saham=d.kode_saham and a.kode_kelola=d.kode_kelola and a.kode_plan=d.kode_plan and d.flag_rev='-' "+
					 "left join ( "+

					 "	select a.kode_saham,a.kode_kelola,a.kode_plan,round(sum((a.h_buku-a.h_oleh) * jumlah),0) as spi_rev "+
					 "	from inv_shmjual_d a "+
					 "	inner join inv_shmjual_m b on a.no_shmjual=b.no_shmjual  "+
					 "	where b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and a.kode_kelola ='"+this.cb_kelola.getText()+"' "+
					 "  group by a.kode_saham,a.kode_kelola,a.kode_plan "+

					 ") e on a.kode_saham=e.kode_saham and a.kode_kelola=e.kode_kelola and a.kode_plan=e.kode_plan "+

					 "where datediff(year,b.tgl_jual,'"+this.dp_d1.getDateString()+"') >= 1 and b.jenis='TRADING' and a.kode_kelola = '"+this.cb_kelola.getText()+"' and a.kode_plan='"+this.cb_plan.getText()+"' and a.jumlah <> 0  and a.nik_user='"+this.nik_user+"'";

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;					
			for (var i in data.rs.rows){
				line = data.rs.rows[i];											
				this.sg.appendData([line.kode_saham,line.nama,floatToNilai(line.jumlah),floatToNilai(line.h_oleh),floatToNilai(line.h_buku),floatToNilai(line.h_wajar),line.tgl_jual,line.jenis,floatToNilai(line.nilai),floatToNilai(line.ni_spi)]);						
			}
		}
		else this.sg.clear(1);	
		this.sg.validasi();	
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
					
					
					//tidak boleh edit hanya boleh hapus
					// if (this.stsSimpan == 0) {
					// 	sql.add("delete from inv_shmreklas_m where no_shmreklas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					// 	sql.add("delete from inv_shmreklas_j where no_shmreklas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					// 	sql.add("delete from inv_shmreklas_d where no_shmreklas='"+this.e_nb.getText()+"' ");					
					
					// 	sql.add("delete from glsap where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																
					// }

					if (this.jKelola == "MI") {
						this.akunSaham = this.akunMI;
						this.akunSahamHTC = this.akunMIhtc;

						this.akunNT = this.akunNTmi;
						this.akunNThtc = this.akunNTmihtc;
					}
					else {
						this.akunSaham = this.akunSWA;
						this.akunSahamHTC = this.akunSWAhtc;

						this.akunNT = this.akunNTswa;
						this.akunNThtc = this.akunNTswahtc;
					}
					
					sql.add("insert into inv_shmreklas_m(no_shmreklas,kode_lokasi,periode,tanggal,nik_user,tgl_input,posted,no_dokumen,keterangan,kode_drk,kode_kelola,nilai,nilai_spi,modul,kode_pp,no_app1,progress,nik_app,kode_plan) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._userLog+"',getdate(),'F','-','"+this.e_ket.getText()+"','"+this.cb_drk.getText()+"','"+this.cb_kelola.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_spi.getText())+",'SHMREKLAS','"+this.kodepp+"','-','0','-','"+this.cb_plan.getText()+"')");
					
					sql.add("insert into inv_shmreklas_j(no_shmreklas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.akunSahamHTC+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.kodepp+"','-','"+this.app._lokasi+"','SHMRKLS','SHMHTC','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");									
					sql.add("insert into inv_shmreklas_j(no_shmreklas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akunSaham+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.kodepp+"','-','"+this.app._lokasi+"','SHMRKLS','SHMTRD','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");									
					
					if (nilaiToFloat(this.e_spi.getText()) > 0) {
						var DCnt = "D";
						var DChtc = "C";						
					}
					else {
						var DCnt = "C";
						var DChtc = "D";
					}
					var nilaiSPI = Math.abs(nilaiToFloat(this.e_spi.getText()));
					sql.add("insert into inv_shmreklas_j(no_shmreklas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',2,'"+this.akunNT+"','"+this.e_ket.getText()+"','"+DCnt+"',"+nilaiSPI+",'"+this.kodepp+"','-','"+this.app._lokasi+"','SHMRKLS','NTTRD','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");									
					sql.add("insert into inv_shmreklas_j(no_shmreklas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',3,'"+this.akunNThtc+"','"+this.e_ket.getText()+"','"+DChtc+"',"+nilaiSPI+",'"+this.kodepp+"','-','"+this.app._lokasi+"','SHMRKLS','NTHTC','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");									

					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i)){
							sql.add("insert into inv_shmreklas_d (no_shmreklas,kode_kelola,kode_saham,h_buku,h_wajar,jumlah,tgl_jual,kode_plan,nilai_saham,nilai_spi) values "+
									"('"+this.e_nb.getText()+"','"+this.cb_kelola.getText()+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+","+nilaiToFloat(this.sg.cells(2,i))+",'"+this.sg.cells(6,i)+"','"+this.cb_plan.getText()+"',"+nilaiToFloat(this.sg.cells(8,i))+","+nilaiToFloat(this.sg.cells(9,i))+")");
							sql.add("update inv_saham_d set jenis='HTS' where kode_saham='"+this.sg.cells(0,i)+"' and kode_kelola='"+this.cb_kelola.getText()+"' and kode_plan='"+this.cb_plan.getText()+"' ");							
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
					this.sg.clear(1);
					this.sg3.clear(1);
					this.stsSimpan = 1;
					setTipeButton(tbSimpan);					
					this.doClick(this.i_gen);
					this.pc2.setActivePage(this.pc2.childPage[0]);			
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.bTampil.show();											
				break;
			case "simpan" :	
			//case "ubah" :													
				var d = new Date();
				var d1 = d.strToDate(this.dp_d1.getText());
				var d2 = d.strToDate(this.tglNow);
				if (d1 > d2) {												
					system.alert(this,"Tanggal tidak valid.","Tanggal Transaksi tidak boleh melebihi tanggal sistem.");
					return false;
				}	
				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);												
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Saham tidak boleh nol atau kurang.");
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

					sql.add("update a set a.jenis='TRADING' "+
							"from inv_saham_d a inner join inv_shmreklas_d b on a.kode_saham=b.kode_saham and a.kode_kelola=b.kode_kelola and a.kode_plan=b.kode_plan "+
							"where b.no_shmreklas='"+this.e_nb.getText()+"' ");							

					sql.add("delete from inv_shmreklas_m where no_shmreklas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_shmreklas_j where no_shmreklas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_shmreklas_d where no_shmreklas='"+this.e_nb.getText()+"' ");					
					
					sql.add("delete from glsap where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");															
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;					
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);			
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},
	doChange:function(sender){
		if (sender == this.cb_plan && this.cb_plan.getText()!="") {			
			var data = this.dbLib.getDataProvider(
					"select kode_param,flag from inv_saham_param where kode_plan = '"+this.cb_plan.getText()+"' and "+
					"kode_param in ('DRKSHMJ','PPINV','SHMSWA','SHMMI','SHMSWA_HTC','SHMMI_HTC','SHMNTSWA','SHMNTMI','SHMNTSWA_HTC','SHMNTMI_HTC')",true);								
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_param == "PPINV") this.kodepp = line.flag;								
					if (line.kode_param == "DRKSHMJ") this.cb_drk.setText(line.flag);	

					if (line.kode_param == "SHMSWA") this.akunSWA = line.flag;			
					if (line.kode_param == "SHMMI") this.akunMI = line.flag;													
					if (line.kode_param == "SHMSWA_HTC") this.akunSWAhtc = line.flag;			
					if (line.kode_param == "SHMMI_HTC") this.akunMIhtc = line.flag;													
					if (line.kode_param == "SHMNTMI") this.akunNTmi = line.flag;								
					if (line.kode_param == "SHMNTSWA") this.akunNTswa = line.flag;																												
					if (line.kode_param == "SHMNTMI_HTC") this.akunNTmihtc = line.flag;								
					if (line.kode_param == "SHMNTSWA_HTC") this.akunNTswahtc = line.flag;																							
				}
			}
		}

		if (sender == this.cb_kelola && this.cb_kelola.getText()!="") {						
			var strSQL = "select jenis from inv_kelola where kode_kelola ='"+this.cb_kelola.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.jKelola = line.jenis;
				}				
			}			
			if (this.stsSimpan == 1) this.sg.clear(1);			
		}					
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			if (this.stsSimpan == 0){
				this.sg.clear(1); 
				this.sg2.clear(1); 
				this.sg3.clear(1);	
				this.bTampil.show();									
			}
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_shmreklas_m","no_shmreklas",this.app._lokasi+"-SRK"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
		}		
	},		
	doNilaiChange: function(){
		try{						
			var nilai = spi = 0 ;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(9,i) != "" && this.sg.cells(8,i) != ""){
					nilai += nilaiToFloat(this.sg.cells(8,i));				
					spi += nilaiToFloat(this.sg.cells(9,i));									
				}
			}			
			this.e_nilai.setText(floatToNilai(nilai));
			this.e_spi.setText(floatToNilai(spi));															
		}catch(e)
		{
			alert("doNilaiChange:"+e);
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {								
								// this.nama_report="server_report_saku3_yakes_inves_rptSahamJualGabung";
								// this.filter2 = " where c.kode_lokasi='"+this.app._lokasi+"' and a.no_shmjual='"+this.e_nb.getText()+"' ";
								// this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_shmjual='"+this.e_nb.getText()+"' ";
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithBs(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
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
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();
				this.pc2.show();   
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);										
			this.sg.clear(1);
			this.sg3.clear(1);
			this.stsSimpan = 1;
			this.bTampil.show();							
			setTipeButton(tbSimpan);					
			this.doClick(this.i_gen);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
		} 
		catch(e) {
			alert(e);
		}
	},

	doLoad3:function(sender){														
		var strSQL = "select a.no_shmreklas,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai as nilai "+
		             "from inv_shmreklas_m a "+					 
					 "where a.progress in ('0','M') and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted='F' "+
					 "order by a.no_shmreklas desc";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.sg3.clear();
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
			this.sg3.appendData([line.no_shmreklas,line.tgl,line.keterangan,line.nilai,"Pilih"]); 
		}
		this.sg3.setNoUrut(start);	
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 4) this.doDoubleClick3(this.sg3,0,row); 				
		}catch(e){
			alert(e);
		}
	},	
	doDoubleClick3: function(sender, col , row) {
		try{
			var baris = row;
			if (this.sg3.cells(0,baris) != "") {			
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbHapus);
				//hapus saja.. input ulang untuk menghitung jumlah sahamnya takutnya jumlah sudah bergerak
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,baris));	
				this.bTampil.hide();							
								
				var strSQL = "select * from inv_shmreklas_m where no_shmreklas= '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.dp_d1.setText(line.tanggal);											
						this.e_ket.setText(line.keterangan);
						this.cb_drk.setText(line.kode_drk);
						this.cb_plan.setText(line.kode_plan);
						this.cb_kelola.setText(line.kode_kelola);												
					}
				}
				
				var strSQL = "select b.kode_saham,b.nama,a.jumlah as jumlah,0 as h_oleh,a.h_buku,a.h_wajar,a.jumlah as jml,a.tgl_jual,c.jenis,a.nilai_saham,a.nilai_spi "+
							 "from inv_shmreklas_d a "+
							 "	   inner join inv_saham b on a.kode_saham=b.kode_saham "+						 							 							 							 
							 "	   inner join inv_saham_d c on a.kode_saham=c.kode_saham and a.kode_kelola=c.kode_kelola and a.kode_plan=c.kode_plan "+		 
							 "where a.no_shmreklas = '"+this.e_nb.getText()+"' ";								 
				var data = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																													
						this.sg.appendData([line.kode_saham,line.nama,floatToNilai(line.jumlah),floatToNilai(line.h_oleh),floatToNilai(line.h_buku),floatToNilai(line.h_wajar),line.tgl_jual,line.jenis,floatToNilai(line.nilai_saham),floatToNilai(line.nilai_spi)]);						
					}					
				} else this.sg.clear(1);															
				
			}
		} catch(e) {alert(e);}
	}
});