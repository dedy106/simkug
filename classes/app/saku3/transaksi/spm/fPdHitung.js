window.app_saku3_transaksi_spm_fPdHitung = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_spm_fPdHitung.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spm_fPdHitung";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi SPPD", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,10,275,20],caption:"No Bukti",readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[300,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,11,275,20],caption:"No Dokumen",maxLength:50});

		this.pc1 = new pageControl(this,{bound:[10,18,1000,410], childPage:["Daftar Pengajuan","Perhitungan","List Transaksi"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:8,tag:0,
		            colTitle:["No Pengajuan","Tanggal","Pengaju","Tgl Mulai","Tgl Selesai","Tujuan","Kota","PP / Unit"],
					colWidth:[[7,6,5,4,3,2,1,0],[200,100,250,75,75,200,70,150]],									
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.e_nobukti = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,270,20],caption:"No Pengajuan",maxLength:30,readOnly:true, tag:2});
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[300,10,220,20],caption:"Tanggal PD", readOnly:true, labelWidth:70});						
		this.e_tujuan = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Tujuan", readOnly:true});						
		this.e_dasar = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,500,20],caption:"Dasar / Alasan", readOnly:true});										
		this.e_trans = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,270,20],caption:"Sarana Transport", readOnly:true});								
		this.e_kota = new saiLabelEdit(this.pc1.childPage[1],{bound:[295,14,225,20],caption:"Kota Tujuan", readOnly:true, labelWidth:70});								
		this.e_akun = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,500,20],caption:"Beban Anggaran", readOnly:true});								

		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,12,995,262], childPage:["Data Karyawan","Perhitungan","Otorisasi"]});		
		this.sg1 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:7,tag:1,
					colTitle:["Status","NIK", "Nama","Band", "PP-Unit / Cabang","Jabatan","Kode PP"],
					colWidth:[[6,5,4,3,2,1,0],[80,200,220,80,200,80,80]],
					columnReadOnly:[true,[1,2,3,4,5,6],[0]],					
					buttonStyle:[[0],[bsAuto]], 				
					picklist:[[0],[new portalui_arrayMap({items:["HITUNG","INPROG","CANCEL"]})]],					
					dblClick:[this,"doDoubleClick1"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg1});		
	
		this.sg2 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:7,tag:9,
					colTitle:["Uraian","%","Jumlah","Satuan","Tarif","Total","Keterangan"],
					colWidth:[[6,5,4,3,2,1,0],[200,80,80,80,80,80,300]],
					columnReadOnly:[true,[5],[0,1,2,3,4,6]],
					colFormat:[[1,2,4,5],[cfNilai,cfNilai,cfNilai,cfNilai]],
					defaultRow:1,
					cellEnter:[this,"doCellEnter2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],autoAppend:true});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg2});											
		this.e_total = new saiLabelEdit(this.sgn2,{bound:[780,1,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				

		this.cb_buat = new saiCBBL(this.pc2.childPage[2],{bound:[20,18,220,20],caption:"Dibuat Oleh", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.e_jabbuat = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,19,400,20],caption:"Jabatan", maxLength:150,tag:2});	
		this.cb_app1 = new saiCBBL(this.pc2.childPage[2],{bound:[20,20,220,20],caption:"Disetujui Oleh", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.e_jab1 = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,21,400,20],caption:"Jabatan", maxLength:150,tag:2});	
		this.cb_app2 = new saiCBBL(this.pc2.childPage[2],{bound:[20,19,220,20],caption:"Diketahui Oleh", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.e_jab2 = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,22,400,20],caption:"Jabatan", maxLength:150,tag:2});	
		
		this.sg3 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:9,
					colTitle:["No SPJ","Tanggal","No Dokumen","No Pengajuan"],
					colWidth:[[3,2,1,0],[200,300,100,200]],									
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		


		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		this.pc2.childPage[2].rearrangeChild(10, 23);	
				
		setTipeButton(tbAllFalse);				
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
			
			this.cb_buat.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);							   
			this.cb_app1.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_app2.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_spm_fPdHitung.extend(window.childForm);
window.app_saku3_transaksi_spm_fPdHitung.implement({		
	doChangeCell2: function(sender, col, row) {		
		if ((col == 1 || col == 2 || col == 4) && this.sg2.cells(1,row)!="" && this.sg2.cells(2,row)!="" && this.sg2.cells(4,row)!="") {			
			this.sg2.setCell(5,row,floatToNilai( Math.round(nilaiToFloat(this.sg2.cells(2,row)) * nilaiToFloat(this.sg2.cells(4,row)) * (nilaiToFloat(this.sg2.cells(1,row))/100))));
		}		
		this.sg2.validasi();
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
	doCellEnter2: function(sender, col, row){
		switch(col){
			case 1 : 
					if (this.sg2.cells(1,row) == ""){
						this.sg2.setCell(1,row,"100");						
					}
				break;				
			case 6 : 
				if (this.sg2.cells(6,row) == ""){
					this.sg2.setCell(6,row,"-");						
				}
			break;										
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();																													
					if (this.stsSimpan == 0) {
						sql.add("delete from pd_spj_m where no_spj='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from pd_spj_d where no_spj='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from spm_rek where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("update pd_aju_nik set no_spj='-',progress='0' where no_spj='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					}

					sql.add("insert into pd_spj_m(no_spj,kode_lokasi,nik_user,tgl_input,periode,tanggal,no_dokumen,no_aju,nik_buat,nik_app1,nik_app2,jab_buat,jab1,jab2,no_ver,no_fiat,no_app3,no_app4,no_kas, progress) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate(),'"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_nobukti.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app1.getText()+"','"+this.cb_app2.getText()+"','"+this.e_jabbuat.getText()+"','"+this.e_jab1.getText()+"','"+this.e_jab2.getText()+"','-','-','-','-','-', '0')");

					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i) && this.sg1.cells(0,i) != "INPROG"){
								if (this.sg1.cells(0,i) == "HITUNG") {
									var vProg = "1";

									for (var j=0;j < this.sg2.getRowCount();j++){
										if (this.sg2.rowValid(j)){
											sql.add("insert into pd_spj_d(no_spj,kode_lokasi,no_aju,nik,nu,uraian,persen,jumlah,satuan,tarif,total,keterangan) values "+
													"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_nobukti.getText()+"','"+this.sg1.cells(1,i)+"',"+j+",'"+this.sg2.cells(0,j)+"',"+nilaiToFloat(this.sg2.cells(1,j))+","+nilaiToFloat(this.sg2.cells(2,j))+",'"+this.sg2.cells(3,j)+"',"+nilaiToFloat(this.sg2.cells(4,j))+","+nilaiToFloat(this.sg2.cells(5,j))+",'"+this.sg2.cells(6,j)+"')");
										}
									}	
									sql.add("insert into spm_rek(no_bukti,kode_lokasi,modul,nama_rek,no_rek,bank,cabang,bruto,pajak,nilai) "+							
											"select '"+this.e_nb.getText()+"',kode_lokasi,'SPPD',nama_rek,no_rek,bank,cabang,"+nilaiToFloat(this.e_total.getText())+",0,"+nilaiToFloat(this.e_total.getText())+" "+
											"from karyawan where nik ='"+this.sg1.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");								

									sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
											"('"+this.e_nb.getText()+"','SPPD','"+this.app._lokasi+"','"+this.kodeAkun+"','"+this.kodePP+"','-','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',0,"+nilaiToFloat(this.e_total.getText())+")");
								}
								else var vProg = "C";									
								sql.add("update pd_aju_nik set no_spj='"+this.e_nb.getText()+"',progress='"+vProg+"' where nik='"+this.sg1.cells(1,i)+"' and no_aju='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
							}
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.sg1.clear(1);
					this.sg2.clear(1);
					this.sg3.clear(1);
					this.doClick();										
					this.doLoadAju();
					this.pc1.setActivePage(this.pc1.childPage[0]);							
					setTipeButton(tbAllFalse);			
				break;
			case "simpan" :				
			case "ubah" :									
				this.preView = "1";				
				var temu = false;
				var temuHitung = 0;
				if (this.sg1.getRowValidCount() > 0){
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i) && (this.sg1.cells(0,i) == "HITUNG" || this.sg1.cells(0,i) == "CANCEL")){
							temu = true;
							if (this.sg1.cells(0,i) == "HITUNG") temuHitung++;
						}
					}
				}
				if (!temu) {
					system.alert(this,"Transaksi tidak valid.","Status Karyawan harus ada yang dipilih [TIDAK INPROG].");
					return false;
				}
				if (temuHitung != 0 && nilaiToFloat(this.e_total.getText()) == 0) {
					system.alert(this,"Transaksi tidak valid.","Data perhitungan harus terisi untuk status -HITUNG-");
					return false;
				}

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
				sql.add("delete from pd_spj_m where no_spj='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
				sql.add("delete from pd_spj_d where no_spj='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
				sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
				sql.add("delete from spm_rek where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
				sql.add("update pd_aju_nik set no_spj='-',progress='0' where no_spj='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
				setTipeButton(tbAllFalse);					
				this.dbLib.execArraySQL(sql);				
				break;					
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		if (this.stsSimpan == 1) {
			this.doLoadAju();
			this.doClick();			
		}
	},	
	doLoadAju:function(sender){						
		if (this.e_periode.getText()!="") {
			var str = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.nik_buat+' - '+b.nama as pengaju,convert(varchar,a.tgl_awal,103) as tglawal,convert(varchar,a.tgl_akhir,103) as tglakhir,a.tujuan,a.kota,a.kode_pp+'-'+c.nama as pp "+
						"from pd_aju_m a "+			
						"	inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+		
						"	inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+		
						"	inner join ( "+
						"			select distinct no_aju from pd_aju_nik where kode_lokasi='"+this.app._lokasi+"' and no_spj='-' "+
						"	) d on a.no_aju=d.no_aju "+
						"where a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";						
			var data = this.dbLib.getDataProvider(str,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataGrid = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);		
			this.pc1.setActivePage(this.pc1.childPage[0]);	
		}					
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataGrid.rs.rows.length? this.dataGrid.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataGrid.rs.rows[i];																			
			this.sg.appendData([line.no_aju,line.tgl,line.pengaju,line.tglawal,line.tglakhir,line.tujuan,line.kota,line.pp]); 
		}
		this.sg.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doChange:function(sender){
		if (sender == this.cb_buat && this.cb_buat.getText()!="" && this.stsSimpan==1 ) {
			var data = this.dbLib.getDataProvider("select jabatan from karyawan where nik='"+this.cb_buat.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_jabbuat.setText(line.jabatan);
				} 
			}	
		}
		if (sender == this.cb_app1 && this.cb_app1.getText()!="" && this.stsSimpan==1 ) {
			var data = this.dbLib.getDataProvider("select jabatan from karyawan where nik='"+this.cb_app1.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_jab1.setText(line.jabatan);
				} 
			}	
		}	
		if (sender == this.cb_app2 && this.cb_app2.getText()!="" && this.stsSimpan==1 ) {
			var data = this.dbLib.getDataProvider("select jabatan from karyawan where nik='"+this.cb_app2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_jab2.setText(line.jabatan);
				} 
			}	
		}		
	},
	doClick:function(sender){		
		if (this.stsSimpan == 0) {			
			this.sg1.clear(1);
			this.sg2.clear(1);
		}
		setTipeButton(tbSimpan);		
		this.stsSimpan = 1;			
		
		//nomor reset setahun (2018 mulai dari bulan mei)
		//var AddFormat = "____/GS-00/SYPUMA-"+this.app._kodePP+"/"+this.e_periode.getText().substr(4,2)+"/"+this.e_periode.getText().substr(0,4)+"%";
		
		if (this.e_periode.getText().substr(0,4) == "2018") var vPeriode = " and periode > '201804' ";
		else var vPeriode = " ";
		
		var AddFormat = "____/GS-00/SYPUMA-"+this.app._kodePP+"/__/"+this.e_periode.getText().substr(0,4)+"%";
		var data = this.dbLib.getDataProvider("select isnull(max(no_spj),0) as no_bukti from pd_spj_m where no_spj like '"+AddFormat+"' and kode_lokasi='"+this.app._lokasi+"' "+vPeriode,true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){
				if (line.no_bukti == "0") this.e_nb.setText("0001/GS-00/SYPUMA-"+this.app._kodePP+"/"+this.e_periode.getText().substr(4,2)+"/"+this.e_periode.getText().substr(0,4));
				else {
					var idx = parseFloat(line.no_bukti.substr(0,4)) + 1;
					idx = idx.toString();
					if (idx.length == 1) var nu = "000"+idx;
					if (idx.length == 2) var nu = "00"+idx;
					if (idx.length == 3) var nu = "0"+idx;
					if (idx.length == 4) var nu = idx;
					this.e_nb.setText(nu+"/GS-00/SYPUMA-"+this.app._kodePP+"/"+this.e_periode.getText().substr(4,2)+"/"+this.e_periode.getText().substr(0,4));						
				}
			} 
		}
		this.e_dok.setFocus();
	},			
	doDoubleClick1: function(sender, col , row) {
		if (sender.cells(0,row) == "INPROG") sender.cells(0,row,"HITUNG");
		else sender.cells(0,row,"INPROG");
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);					
				this.e_nobukti.setText(this.sg.cells(0,row));	
				
				var str = "select convert(varchar,a.tgl_awal,103)+' - '+convert(varchar,a.tgl_akhir,103) as tgl, a.tujuan,a.dasar,a.transport,a.kota,a.kode_akun+' - '+b.nama as akun,a.kode_akun,a.kode_pp "+
						  "from pd_aju_m a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						  "where a.no_aju='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'"
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

						this.kodeAkun = line.kode_akun;	
						this.kodePP = line.kode_pp;
					} 
				}

				if (this.stsSimpan == 1) {				
					var str = "select 'INPROG' as status,a.nik,c.nama,a.kode_band,b.nama as pp,a.jabatan,a.kode_pp "+
						 	  "from pd_aju_nik a "+
							  "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							  "inner join karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
							  "where a.no_spj = '-' and a.no_aju='"+this.e_nobukti.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";		
				}
				else {					
					var str = "select case when a.progress = '1' then 'HITUNG' when a.progress = 'C' then 'CANCEL' end as status "+
							  ",a.nik,c.nama,a.kode_band,b.nama as pp,a.jabatan,a.kode_pp "+
							  "from pd_aju_nik a "+
							  "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							  "inner join karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
							  "where a.no_spj = '"+this.e_nb.getText()+"' and a.no_aju='"+this.e_nobukti.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";		

					var str2 = "select distinct nu,uraian,persen,jumlah,satuan,tarif,total,keterangan from pd_spj_d where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' order by nu";										
					var data = this.dbLib.getDataProvider(str2,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg2.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];												
							this.sg2.appendData([line.uraian,floatToNilai(line.persen),floatToNilai(line.jumlah),line.satuan,floatToNilai(line.tarif),floatToNilai(line.total),line.keterangan]);
						}
					} else this.sg2.clear(1);			  
				}				
				var data = this.dbLib.getDataProvider(str,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.status.toUpperCase(),line.nik,line.nama,line.kode_band,line.pp,line.jabatan,line.kode_pp]);
					}
				} else this.sg1.clear(1);	
			
			}
		} catch(e) {alert(e);}
	},										
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_spm_rptSppdHit";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nobukti.getText()+"' ";
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
			this.sg1.clear(1);
			this.sg2.clear(1);
			this.sg3.clear(1);
			this.doClick();										
			this.doLoadAju();
			this.pc1.setActivePage(this.pc1.childPage[0]);							
			setTipeButton(tbAllFalse);			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){		
		var strSQL = "select a.no_spj, convert(varchar,a.tanggal,103) as tgl, a.no_dokumen, a.no_aju  "+
					 "from pd_spj_m a  "+
					 "left join ( "+
					 "			select distinct no_spj "+
					 "			from pd_aju_nik "+
					 "			where kode_lokasi='"+this.app._lokasi+"' and progress not in ('0','1','C') "+
					 "			) b on a.no_spj=b.no_spj "+
					 "where b.no_spj is null and a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_periode.getText()+"' order by a.no_spj";
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
			this.sg3.appendData([line.no_spj,line.tgl,line.no_dokumen,line.no_aju]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		this.e_nb.setText(sender.cells(0,row));		
		setTipeButton(tbUbahHapus);	
		this.stsSimpan = 0;

		var str = "select no_dokumen,nik_buat,nik_app1,nik_app2,jab_buat,jab1,jab2 "+
				  "from pd_spj_m  "+
				  "where no_spj='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'"
		var data = this.dbLib.getDataProvider(str,true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){
				this.e_dok.setText(line.no_dokumen);
				this.cb_buat.setText(line.nik_buat);					
				this.cb_app1.setText(line.nik_app1);					
				this.cb_app2.setText(line.nik_app2);					
				this.e_jabbuat.setText(line.jab_buat);					
				this.e_jab1.setText(line.jab1);					
				this.e_jab2.setText(line.jab2);					
			} 
		}
		
		var str = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.nik_buat+' - '+b.nama as pengaju,convert(varchar,a.tgl_awal,103) as tglawal,convert(varchar,a.tgl_akhir,103) as tglakhir,a.tujuan,a.kota,a.kode_pp+'-'+c.nama as pp "+
				  "from pd_aju_m a "+			
				  "	inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+		
				  "	inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+		
				  "	inner join ( "+
				  "			select distinct no_aju from pd_aju_nik where kode_lokasi='"+this.app._lokasi+"' and no_spj='"+this.e_nb.getText()+"' "+
				  "	) d on a.no_aju=d.no_aju "+
				  "where a.no_aju='"+sender.cells(3,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' ";						
		var data = this.dbLib.getDataProvider(str,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataGrid = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);		
		this.pc1.setActivePage(this.pc1.childPage[0]);	
	}
});

