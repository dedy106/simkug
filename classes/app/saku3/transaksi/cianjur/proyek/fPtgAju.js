window.app_saku3_transaksi_cianjur_proyek_fPtgAju = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_cianjur_proyek_fPtgAju.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_cianjur_proyek_fPtgAju";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Input Pertanggungan", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;tinymceCtrl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Pertanggungan","List Pertanggungan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No Ptg","No Panjar","Tanggal","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,490,180,80,100]],colFormat:[[4],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data SPB",click:[this,"doLoad3"]});

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Keterangan", maxLength:150});				
		this.cb_pp = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"PP", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});								
		this.cb_buat = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Dibuat Oleh", multiSelection:false, maxLength:10, tag:2});		
		this.cb_setuju = new saiCBBL(this.pc2.childPage[0],{bound:[20,21,220,20],caption:"Disetujui Oleh", multiSelection:false, maxLength:10, tag:2});		
		
		this.cb_pj = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Bukti Panjar", multiSelection:false, readOnly:true, tag:1,change:[this,"doChange"]});
		this.c_status = new saiCB(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Status",items:["OPEN","CLOSE"], readOnly:true,tag:2});		
		this.e_akunpj = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Akun Panjar", readOnly:true});						
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,18,200,20],caption:"Nilai Perttg.", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_nilaipj = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,21,200,20],caption:"Nilai Panjar", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_sls = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,21,200,20],caption:"Nilai Selisih", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
				
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,210], childPage:["Item Mata Anggaran","Control Proyek"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode Proyek","Nama Proyek"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[200,100,150,80,100,200,50,150,80]],					
					columnReadOnly:[true,[1,6,8],[0,2,3,4,5,7]],
					buttonStyle:[[0,2,5,7],[bsEllips,bsAuto,bsEllips,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		

		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:9,
			colTitle:["Kode Proyek","Nama Proyek","Saldo OR","Nilai","Saldo Akhir"],
			colWidth:[[4,3,2,1,0],[100,100,100,200,80]],
			readOnly:true,colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Cek Saldo OR",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungOR"]});
		
		this.rearrangeChild(10, 23);	
		this.pc2.childPage[0].rearrangeChild(10, 23);	
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan=1;			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_pp.setText(this.app._kodePP,this.app._namaPP);
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");	
			
			this.flagDokFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE','DOKFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																								
					if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;			
				}
			}	
							
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1' ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_buat.setSQL("select nik, nama from karyawan where  kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_setuju.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);						
		
			
			this.dataPP = this.app._pp;
			var sql = new server_util_arrayList();			
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '037' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");
			sql.add("select a.kode_proyek,a.nama from pr_proyek a where a.jenis='NONSP' and a.flag_aktif = '1' and a.kode_lokasi = '"+this.app._lokasi+"' union select '-','-'");
			this.dbLib.getMultiDataProviderA(sql);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_cianjur_proyek_fPtgAju.extend(window.childForm);
window.app_saku3_transaksi_cianjur_proyek_fPtgAju.implement({
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
	doHitungOR: function(){
		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i) && this.sg.cells(7,i) != "-"){
				if (this.sg.cells(2,i) == "D") nilai = nilaiToFloat(this.sg.cells(4,i));
				else nilai = nilaiToFloat(this.sg.cells(4,i)) * -1;
				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg.cells(7,i) == this.sg2.cells(0,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg2.appendData([this.sg.cells(7,i),this.sg.cells(8,i),"0",floatToNilai(nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(3,idx));
					total = total + nilai;
					this.sg2.setCell(3,idx,total);
				}
			}
		}
		var sls2 = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			if (this.stsSimpan == 1) 
			var data = this.dbLib.getDataProvider("select a.kode_proyek,a.nama,a.nilai_or, a.nilai_or-isnull(b.tot_beban,0) as saldo_or "+
					"from pr_proyek a "+
					"left join "+
					"(select kode_proyek,sum(case dc when 'D' then nilai else -nilai end) as tot_beban "+
					"from pr_beban_d where kode_lokasi='"+this.app._lokasi+"' and kode_proyek='"+this.sg2.cells(0,i)+"' "+
					"group by kode_proyek "+
					") b on a.kode_proyek=b.kode_proyek  "+
					"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_proyek='"+this.sg2.cells(0,i)+"' ",true);

			else 
			var data = this.dbLib.getDataProvider("select a.kode_proyek,a.nama,a.nilai_or, a.nilai_or-isnull(b.tot_beban,0)+isnull(c.tot_beban,0) as saldo_or "+
					"from pr_proyek a "+
					"left join "+
					"(select kode_proyek,sum(case dc when 'D' then nilai else -nilai end) as tot_beban "+
					"from pr_beban_d where kode_lokasi='"+this.app._lokasi+"' and kode_proyek='"+this.sg2.cells(0,i)+"' "+
					"group by kode_proyek "+
					") b on a.kode_proyek=b.kode_proyek  "+
					"left join "+
					"(select kode_proyek,sum(case dc when 'D' then nilai else -nilai end) as tot_beban "+
					"from pr_beban_d where kode_lokasi='"+this.app._lokasi+"' and kode_proyek='"+this.sg2.cells(0,i)+"' and no_bukti='"+this.e_nb.getText()+"' "+
					"group by kode_proyek) c on a.kode_proyek=c.kode_proyek "+
					"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_proyek='"+this.sg2.cells(0,i)+"' ",true);			
			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				// data = line.gar.split(";");
				// sls2 = parseFloat(data[0]) - parseFloat(data[1]);
				sls2 = line.saldo_or;
				this.sg2.cells(2,i,floatToNilai(sls2));
				sls2 = sls2 - nilaiToFloat(this.sg2.cells(3,i));
				this.sg2.cells(4,i,floatToNilai(sls2));
			}
		}
	},
	simpan: function(){			
		try{									
			if (this.stsSimpan==1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					if(this.stsSimpan==0){
						
						sql.add("update panjar2_m set progress = '2' where no_panjar='"+this.cb_pj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
						
						sql.add("delete from panjarptg2_m where no_ptg = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from panjarptg2_j where no_ptg = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
						sql.add("delete from pr_beban_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
						setTipeButton(tbAllFalse);	
						this.dbLib.execArraySQL(sql);
					}
					var selisih=0;

					if(this.c_status.getText() == 'CLOSE'){
						sql.add("update panjar2_m set progress = '3' where no_panjar='"+this.cb_pj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						selisih=parseNilai(this.e_sls.getText());
					}else{
						selisih=0;
					}				
					sql.add("insert into panjarptg2_m (no_ptg,no_panjar,no_final,no_ver,no_dokumen,tanggal,keterangan,akun_panjar,nik_buat,nik_app,kode_lokasi,kode_pp,nilai_pj,nilai,nilai_kas,progress,periode,nik_user,tgl_input,modul,status) values "+
						    "('"+this.e_nb.getText()+"','"+this.cb_pj.getText()+"','-','-','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_akunpj.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"',"+parseNilai(this.e_nilaipj.getText())+","+parseNilai(this.e_total.getText())+","+selisih+",'0','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'PJPTG','"+this.c_status.getText()+"')");
										
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){								
								sql.add("insert into panjarptg2_j(no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i)+"',"+parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(5,i)+"','-','"+this.app._lokasi+"','PJPTG','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
								sql.add("insert into pr_beban_d(no_bukti,kode_akun,keterangan,dc,nilai,kode_pp,kode_proyek,kode_lokasi,modul) values "+
										"('"+this.e_nb.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i)+"',"+parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(5,i)+"','"+this.sg.cells(7,i)+"','"+this.app._lokasi+"','PJPTG')");
							}
						}
					}

					var nil_pj=0;
					if(this.c_status.getText()=='OPEN'){
						nil_pj=this.e_total.getText();
					}else{
						nil_pj=this.e_nilaipj.getText();
					}
					sql.add("insert into panjarptg2_j(no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',99,'"+this.e_akunpj.getText()+"','"+this.e_ket.getText()+"','C',"+parseNilai(nil_pj)+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','PJPTG','PANJAR','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");	
					sql.add("insert into pr_beban_d(no_bukti,kode_akun,keterangan,dc,nilai,kode_pp,kode_proyek,kode_lokasi,modul) values "+
							"('"+this.e_nb.getText()+"','"+this.e_akunpj.getText()+"','"+this.e_ket.getText()+"','C',"+parseNilai(nil_pj)+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','PJPTG')");
										
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
					this.sg.clear(1); this.sg2.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
			case "ubah"	  :	
				this.preView = 1;
				if (nilaiToFloat(this.e_sls.getText()) < 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai selisih tidak boleh kurang dari 0");
					return false;
				}
				if (nilaiToFloat(this.e_sls.getText()) == 0 && this.c_status.getText()=='OPEN') {
					system.alert(this,"Transaksi tidak valid.","Status tidak boleh open jika nilai selisih 0");
					return false;
				}	
				if (this.flagDokFree == "1") {				
					var data = this.dbLib.getDataProvider("select no_ptg from panjarptg2_m where no_dokumen='"+this.e_dok.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							system.alert(this,"No Dokumen sudah terpakai.","Terpakai di no bukti : "+line.no_ptg);
							return false;
						} 
					}
				}				
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
					else{
						if(this.sg.cells(7,i) == "-"){
							system.alert(this,"Transaksi tidak valid.","Kolom proyek tidak boleh - .");
							return false;
						}
					}															
				}
				this.dataOR = {rs:{rows:[]}};
				var data = this.dbLib.getDataProvider("select kode_proyek from pr_proyek where jenis='NONSP' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataOR = data;
				}

				this.doHitungOR();
											
				for (var i=0;i < this.sg2.getRowCount();i++){								
					if ((nilaiToFloat(this.sg2.cells(3,i)) > 0) && (nilaiToFloat(this.sg2.cells(2,i)) < nilaiToFloat(this.sg2.cells(3,i)))) {
						var k =i+1;
						system.alert(this,"Transaksi tidak valid.","Saldo OR tidak mencukupi. [Baris : "+k+"]");
						return false;						
					}													
				}
																		
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				/*
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				*/
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
			case "hapus":
				this.preView = 0;	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				/*
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				*/
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}				 	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("update panjar2_m set progress = '2' where no_panjar='"+this.cb_pj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							
					sql.add("delete from panjarptg2_m where no_ptg = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from panjarptg2_j where no_ptg = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from pr_beban_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
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
		if(this.stsSimpan==1) this.doClick();
	},	
	doChange:function(sender){
		if (sender == this.e_periode || sender == this.cb_pp) {
			if (this.e_periode.getText()!="" && this.cb_pp.getText()!="") {				
				this.cb_pj.setSQL("select no_panjar, keterangan from panjar2_m where progress='2' and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_panjar","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true); //kode_pp='"+this.cb_pp.getText()+"' and 
			}
		}
		if (sender == this.cb_pj && this.cb_pj.getText()!="" && this.stsSimpan == 1) {
			var strSQL = "select a.no_panjar,a.akun_panjar,a.nilai,isnull(b.nilai,0) as nilai2, a.nilai-isnull(b.nilai,0) as saldo from panjar2_m a left join (select b.kode_lokasi,b.no_panjar,sum(b.nilai) as nilai from panjarptg2_m b group by b.no_panjar,b.kode_lokasi ) b on a.no_panjar=b.no_panjar and a.kode_lokasi=b.kode_lokasi where a.no_panjar='"+this.cb_pj.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){																				
					this.e_akunpj.setText(line.akun_panjar);
					this.e_nilaipj.setText(floatToNilai(line.saldo));															
				} 
			}			
			var data = this.dbLib.getDataProvider(
						"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,'-' as kode_proyek,'-' as nama_proyek "+
						"from panjar2_d a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"            	  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						"where a.no_panjar = '"+this.cb_pj.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,this.e_nilaipj.getText(),line.kode_pp,line.nama_pp,line.kode_proyek,line.nama_proyek]);
				}
			} else this.sg.clear(1);			
		}
	},
	doClick:function(sender){
		if(this.stsSimpan==0){
			this.sg.clear(); 
			this.sg2.clear(1); 
		}
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"panjarptg2_m","no_ptg",this.app._lokasi+"-PTG"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_dok.setFocus();
	},
	doChangeCell: function(sender, col, row){
		if ((col == 2 || col == 4) && (this.sg.cells(4,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}
		if (col == 5) {
			if (sender.cells(5,row) != "") {
				var pp = this.dataPP.get(sender.cells(5,row));
				if (pp) sender.cells(6,row,pp);
				else {
					if (trim(sender.cells(5,row)) != "") system.alert(this,"Kode PP "+sender.cells(5,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(5,row,"");
					sender.cells(6,row,"");
				}				
			}
		}
		if (col == 7) {
			if (sender.cells(7,row) != "" && this.stsSimpan==1) {
				var pr = this.dataProyek.get(sender.cells(7,row));
				if (pr) sender.cells(8,row,pr);
				else {
					if (trim(sender.cells(7,row)) != "") system.alert(this,"Kode Proyek "+sender.cells(7,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(7,row,"");
					sender.cells(8,row,"");
				}	
					
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
	},
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){
					if (this.sg.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg.cells(4,i));
					if (this.sg.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg.cells(4,i));
				}
			}		
			var tot = totD - totC;	
			this.e_total.setText(floatToNilai(tot));
			var sls = nilaiToFloat(this.e_nilaipj.getText()) - nilaiToFloat(this.e_total.getText());
			this.e_sls.setText(floatToNilai(sls));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doCellEnter: function(sender, col, row){
		switch(col){
			case 2 : 
					this.sg.cells(2,row,"D");
			case 3 : 
					if (this.sg.cells(3,row) == ""){
						if (row == 0) this.sg.setCell(3,row,this.e_ket.getText());
						else this.sg.setCell(3,row,this.sg.cells(3,(row-1)) );
					}
				break;
			case 4 : 
					if (this.sg.cells(4,row) == "" && row > 0) {
						var sls = nilaiToFloat(this.e_sls.getText());
						sls = Math.abs(sls); 
						this.sg.setCell(4,row,floatToNilai(sls));
					}
				break;
			case 5 : 
					if ((this.sg.cells(5,row) == "") && (row > 0)) {
						this.sg.setCell(5,row,this.sg.cells(5,(row-1)));
						this.sg.setCell(6,row,this.sg.cells(6,(row-1)));
					}
					else {
						this.sg.setCell(5,row,this.cb_pp.getText());
						this.sg.setCell(6,row,this.cb_pp.rightLabelCaption);
					}
				break;
		}
	},		
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '037' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '037' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							"select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and  tipe='posting' and flag_aktif ='1'",
							"select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
							["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 7){
					this.standarLib.showListData(this, "Daftar Proyek",sender,undefined, 
							"select kode_proyek, nama  from pr_proyek where jenis = 'NONSP' and kode_lokasi = '"+this.app._lokasi+"' and flag_aktif ='1'",
							"select count(kode_proyek) from pr_proyek where jenis = 'NONSP' and kode_lokasi = '"+this.app._lokasi+"' and flag_aktif ='1'",
							["kode_proyek","nama"],"and",["Kode","Keterangan"],false);	
							
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if(this.preView==1){
								this.nama_report="server_report_saku3_cianjur_rptPjPtgForm";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ptg='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText();
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
							}else{
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}							
							
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkun = new portalui_arrayMap();
							this.dataProyek = new portalui_arrayMap();							
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataAkun.set(line.kode_akun, line.nama);
								}
							}
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];
									this.dataProyek.set(line.kode_proyek, line.nama);
								}
							}							
						}else throw result;
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
			this.sg.clear(1); this.sg2.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		var strSQL = "select a.no_ptg,a.no_panjar,isnull(b.kode_proyek,'-') as kode_proyek,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.nilai "+
		"from panjarptg2_m a "+
		"left join pr_beban_d b on a.no_ptg=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
		"where b.dc='D' and b.kode_proyek !='-' and a.progress in ('0','R') and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_ptg desc";						
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
			this.sg3.appendData([line.no_ptg,line.no_panjar,line.tanggal,line.keterangan,floatToNilai(line.nilai)]); 
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
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select no_ptg,no_panjar,kode_pp,no_dokumen,tanggal,keterangan,akun_panjar,nik_buat,nik_app,kode_pp,nilai_pj,nilai,nilai_kas,status "+		
							 "from panjarptg2_m a "+
							 "where a.no_ptg='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];						
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);	
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);
						this.cb_buat.setText(line.nik_buat);
						this.cb_setuju.setText(line.nik_app);
						this.cb_pp.setText(line.kode_pp);
						this.cb_pj.setSQL("select no_panjar, keterangan from panjar2_m where progress in ('2','3')  and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_panjar","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
						this.cb_pj.setText(line.no_panjar);
						this.c_status.setText(line.status);
						this.e_akunpj.setText(line.akun_panjar);
						this.e_total.setText(floatToNilai(line.nilai));
						this.e_nilaipj.setText(floatToNilai(line.nilai_pj));
						this.e_sls.setText(floatToNilai(line.nilai_kas));
						
					} 
				}
				var data = this.dbLib.getDataProvider(
					"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_proyek,d.nama as nama_proyek "+
					"from pr_beban_d a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
					"inner join pr_proyek d on a.kode_proyek=d.kode_proyek and a.kode_lokasi=d.kode_lokasi "+
					"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_akun != '"+this.e_akunpj.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					this.dataJU = data;
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_proyek,line.nama_proyek]);
					}
				} else this.sg.clear(1);					
				this.sg.validasi();
			}									
		} catch(e) {alert(e);}
	}
});