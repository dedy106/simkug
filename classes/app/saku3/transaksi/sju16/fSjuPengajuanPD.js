window.app_saku3_transaksi_sju16_fSjuPengajuanPD = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sju16_fSjuPengajuanPD.prototype.parent.constructor.call(this,owner);
		this.maximize();		
		
		this.className  = "app_saku3_transaksi_sju16_fSjuPengajuanPD";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Perjalan Dinas", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		
		this.pc1 = new pageControl(this,{bound:[20,20,1000,450], childPage:["Data Pengajuan","Daftar Pengajuan"]});//,"Filter Cari"
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:6,tag:9, 
		            colTitle:["No Pengajuan","Tanggal","Tujuan","Agenda","Waktu Kegiatan","Transportasi"],
					colWidth:[[5,4,3,2,1,0],[150,200,150,150,80,120]],					
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});
		
		this.e_periode = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[200,10,220,20],caption:"Periode",tag:2,readOnly:true,visible:false});		
        this.e_tgl = new portalui_label(this.pc1.childPage[0],{bound:[20,10,100,20],caption:"Tanggal", underline:true});
        this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,10,98,18],selectDate:[this,"doSelectDate"]});
		this.e_nb = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"No Perdin",maxLength:20,change:[this,"doChange"],readOnly:true});
        this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		 		
        this.e_tujuan = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,300,20],caption:"Tujuan",maxLength:200,tag:1});
        this.e_agenda = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,300,20],caption:"Agenda Kegiatan",maxLength:200,tag:1});
        this.e_waktu = new portalui_label(this.pc1.childPage[0],{bound:[20,15,100,20],caption:"Waktu Kegiatan", underline:true});
        this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,15,98,18],selectDate:[this,"doSelectDate2"]});
        this.dp_d3 = new portalui_datePicker(this.pc1.childPage[0],{bound:[220,15,98,18],selectDate:[this,"doSelectDate2"]});

		this.e_transport = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,300,20],caption:"Transportasi",maxLength:200,tag:1});
		this.cb_pp = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"PP / Unit", multiSelection:false, maxLength:10});
		// this.cb_akun = new saiCBBL(this.pc1.childPage[0],{bound:[20,10,220,20],caption:"Jenis Akun",maxLength:10,multiSelection:false,change:[this,"doChange"]});	
		this.cb_keg = new saiCBBL(this.pc1.childPage[0],{bound:[20,10,220,20],caption:"Kegiatan",maxLength:10,multiSelection:false,change:[this,"doChange"]});	
	
        // this.e_nb2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,300,20],caption:"No Perdin",maxLength:20,tag:2});
        // this.bLoad = new button(this.pc1.childPage[2],{bound:[120,12,80,18],caption:"Cari Data",click:[this,"doCari"]});	
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[5,30,this.pc1.width-12,this.pc1.height-220], childPage:["Input Detail","Otorisasi"]});
		this.sg2 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:11,tag:0,
		            colTitle:["NIK","Nama","Kode Jab","Posisi","Jumlah Hari","Negara","UPD","Lokasi","Nama Lok","P/PP","Transport"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[100,50,80,80,100,50,80,100,50,150,100]],
					columnReadOnly:[true,[1,2,3,6,8,10],[0,4,5,7,9]],
					buttonStyle:[[0,5,7,9],[bsEllips,bsAuto,bsEllips,bsAuto]],
					colHide:[[2,8],true],
                    picklist:[[5,9],[new portalui_arrayMap({items:["DN","LN"]}),new portalui_arrayMap({items:["P","PP"]})]], 
					colFormat:[[6,10],[cfNilai,cfNilai]],					
					autoAppend:true,defaultRow:1,					
					ellipsClick:[this,"doEllipsClick2"],
					change:[this,"doChangeCell2"]
					});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg2});
		
		this.cb_app1 = new saiCBBL(this.pc2.childPage[1],{bound:[20,10,220,20],caption:"Approve1",maxLength:10,multiSelection:false});	
		this.cb_app2 = new saiCBBL(this.pc2.childPage[1],{bound:[20,11,220,20],caption:"Approve2",maxLength:10,multiSelection:false});	

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);

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
			
			// this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);

			this.cb_keg.setSQL("select kode_kegiatan, nama from sju_kegiatan where kode_lokasi='"+this.app._lokasi+"'",["kode_kegiatan","nama"],false,["Kode","Nama"],"and","Data Kegiatan",true);			
			this.cb_pp.setSQL("select distinct a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP/Unit",true);	

			this.cb_app1.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);			
			this.cb_app2.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);			
			
			var sql = new server_util_arrayList();
			sql.add("select nik,nama from karyawan where kode_lokasi='"+this.app._lokasi+"'");
			sql.add("select kode_trans,nama from pd_utrans where kode_lokasi='"+this.app._lokasi+"'");	
			
			this.dbLib.getMultiDataProviderA(sql);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sju16_fSjuPengajuanPD.extend(window.childForm);
window.app_saku3_transaksi_sju16_fSjuPengajuanPD.implement({
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
			if (this.stsSimpan == 1) this.doGenerateNo();					
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	

					if (this.stsSimpan == 0) {	
						
						var strSQL = "select no_pb from sju_perdin_d "+
						"where no_perdin = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
						var data = this.dbLib.getDataProvider(strSQL,true);

						if (typeof data == "object" && data.rs.rows[0] != undefined){
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								sql.add("delete from sju_pb_m where no_pb = '"+line.no_pb+"' and kode_lokasi='"+this.app._lokasi+"'");	
								sql.add("delete from sju_pb_j where no_pb = '"+line.no_pb+"' and kode_lokasi='"+this.app._lokasi+"'");
								sql.add("delete from angg_r where no_bukti = '"+line.no_pb+"' and kode_lokasi='"+this.app._lokasi+"'");	
							}											
						}
						
						sql.add("delete from sju_perdin_m where no_perdin = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from sju_perdin_d where no_perdin = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
												
					}				
					sql.add("insert into sju_perdin_m (no_perdin,kode_lokasi,tanggal,periode,tujuan,agenda,tgl_mulai,tgl_selesai,transport,kode_akun,tgl_input,nik_user,kode_pp, nik_app1,nik_app2) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.e_tujuan.getText()+"','"+this.e_agenda.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"','"+this.e_transport.getText()+"','"+this.kodeAkun+"',getdate(),'"+this.app._userLog+"','"+this.cb_pp.getText()+"','"+this.cb_app1.getText()+"','"+this.cb_app2.getText()+"')");
					
					
					var noPB = this.standarLib.noBuktiOtomatis(this.dbLib,"sju_pb_m","no_pb","99-PB"+this.e_periode.getText().substr(2,4)+".","0000");

					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)) {
							
							var vProg = "0";
							var total = nilaiToFloat(this.sg2.cells(6,i)) + nilaiToFloat(this.sg2.cells(10,0));

							sql.add("insert into sju_pb_m (no_pb,no_dokumen,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nilai_curr,nilai,kode_curr,kurs,modul,progress,kode_pp,nik_buat,nik_atasan,nik_app1,nik_app2,nik_app3,nik_app4,  no_ver,no_atasan,no_app1,no_app2,no_app3,no_app4,no_kas) values  "+
									"('"+noPB+"','"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d3.getDateString()+"','"+this.e_tujuan.getText()+"',"+total+","+total+",'IDR',1,'PB','"+vProg+"','"+this.cb_pp.getText()+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(0,i)+"','-','-','-','-','-','-','-','-','-','-','-')");
							
							sql.add("insert into sju_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai_curr,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs,nilai) values "+
									"('"+noPB+"','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.kodeAkun+"','"+this.e_tujuan.getText()+"','D',"+total+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','PBBAU','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1,"+total+")");	

							sql.add("insert into sju_perdin_d(no_perdin,kode_lokasi,nik,kode_jab,negara,upd,kode_trans,p_pp,utrans,tgl_input,nik_user,no_pb,jum_hari,kode_pp) values ('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(5,i)+"',"+nilaiToFloat(this.sg2.cells(6,i))+",'"+this.sg2.cells(7,i)+"','"+this.sg2.cells(9,i)+"',"+nilaiToFloat(this.sg2.cells(10,i))+",getdate(),'"+this.app._userLog+"','"+noPB+"',"+this.sg2.cells(4,i)+",'"+this.cb_pp.getText()+"')");

							sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai,gar_thn,gar_tw,gar_bulan,no_ref,param1,param2) values "+
										"('"+noPB+"','PB','"+this.app._lokasi+"','"+this.kodeAkun+"','"+this.cb_pp.getText()+"','-','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',0,"+total+",0,0,0,'-','-','-')");


							sql.add("insert into sju_pb_user (no_pb,kode_lokasi,nik_user,tgl_input) values  "+
							"('"+noPB+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate())");


							noPB= this.doGenerateNoPB(noPB);


						}
					}							
					
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.pc1.setActivePage(this.pc1.childPage[1]);
					setTipeButton(tbAllFalse);
					this.doLoad();
				}
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
				var strSQL = "select no_pb from sju_perdin_d "+
						"where no_perdin = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
						var data = this.dbLib.getDataProvider(strSQL,true);

				if (typeof data == "object" && data.rs.rows[0] != undefined){
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						sql.add("delete from sju_pb_m where no_pb = '"+line.no_pb+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from sju_pb_j where no_pb = '"+line.no_pb+"' and kode_lokasi='"+this.app._lokasi+"'");	
					}											
				}

				sql.add("delete from sju_perdin_m where no_perdin = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from sju_perdin_d where no_perdin = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
				
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);		
				break;				
		}
	},
	doGenerateNoPB: function(nobukti){
		var str = nobukti;
		var res = str.split(".");
		var no= parseFloat(res[1])+1;
		if(no.toString().length == 1)
		{
			no="000"+no;
		}else if(no.toString().length == 2){
			no="00"+no;
		}else if(no.toString().length == 3){
			no="0"+no;
		}
		
		return res[0]+"."+no;
	},
    doSelectDate: function(sender, y,m,d){
        if (m < 10) m = "0" + m;	
        var periode=this.app._periode;
        this.tahun=y;		
		if (parseFloat(periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);
			if (m=="01") this.Aperiode = "I";
			if (m=="02") this.Aperiode = "II";
			if (m=="03") this.Aperiode = "III";
			if (m=="04") this.Aperiode = "IV";
			if (m=="05") this.Aperiode = "V";
			if (m=="06") this.Aperiode = "VI";
			if (m=="07") this.Aperiode = "VII";
			if (m=="08") this.Aperiode = "VIII";
			if (m=="09") this.Aperiode = "IX";
			if (m=="10") this.Aperiode = "X";
			if (m=="11") this.Aperiode = "XI";
			if (m=="12") this.Aperiode = "XII";			
		}
		else {
			this.e_periode.setText(this.app._periode);		
			if (m=="13") this.Aperiode = "XIII";			
			if (m=="14") this.Aperiode = "XIV";			
			if (m=="15") this.Aperiode = "XV";			
			if (m=="16") this.Aperiode = "XVI";						
		}			
		if (this.stsSimpan == 1) this.doClick(this.i_gen);					
    },
    // doSelectDate2: function(sender, y,m,d){
	// 	var data2 = this.dbLib.getDataProvider("select datediff(day,'"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"') + 1 as jumlah ",true);
	// 	if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
	// 		var line2 = data2.rs.rows[0];
	// 		this.e_jml.setText(line2.jumlah);
	// 	}
	// },
	doClick:function(sender){
        if (sender == this.i_gen) {
			this.doGenerateNo();
			this.e_tujuan.setFocus();
			setTipeButton(tbSimpan);
		}		
	},
	doGenerateNo: function(sender){
		if (this.e_periode.getText()!= "") {									
            var AddFormat = "/SPD/HC/"+this.Aperiode+"/"+this.tahun;					
            var data = this.dbLib.getDataProvider("select isnull(max(no_perdin),0) as no_bukti from sju_perdin_m where no_perdin like '___"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"'",true);
            if (typeof data == "object"){
                var line = data.rs.rows[0];							
                   if (line != undefined){
                        if (line.no_bukti == "0") this.e_nb.setText("001"+AddFormat);
                        else {
                            var idx = parseFloat(line.no_bukti.substr(0,3)) + 1;
                            idx = idx.toString();
                            if (idx.length == 1) var nu = "00"+idx;
                            if (idx.length == 2) var nu = "0"+idx;
                            if (idx.length == 3) var nu = idx;
                            this.e_nb.setText(nu+AddFormat);						
                        }
                    } 
            }
			
        }
	},
	doChange: function(sender){
		try{						
			if (sender == this.cb_keg && this.cb_keg.getText() != ""){
				var strSQL = "select a.kode_akun "+
				             "from sju_kegiatan a "+
						     "where a.kode_kegiatan ='"+this.cb_keg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.kodeAkun = line.kode_akun;						
					}
					
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}

	},			
	doEllipsClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
						    "select nik,nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",
							"select count(*) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
							["nik","nama"],"and",["NIK","Nama"],false);				
				}
				if (col == 7){
					this.standarLib.showListData(this, "Daftar Lokasi",sender,undefined, 
						    "select kode_trans,nama from pd_utrans where kode_lokasi='"+this.app._lokasi+"'",
							"select count(*) from pd_utrans where kode_lokasi='"+this.app._lokasi+"'",
							["kode_trans","nama"],"and",["Kode","Nama"],false);				
				}
				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell2: function(sender, col, row){
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (this.sg2.cells(0,row) != "") {				
				var nik = this.dataNIK.get(sender.cells(0,row));				
				if (nik) 
				{
					var strSQL = "select a.kode_jab,b.nama from karyawan a inner join hr_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi "+
					"where a.nik = '"+this.sg2.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					var data = this.dbLib.getDataProvider(strSQL,true);

					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];																			
						this.sg2.cells(2,row,line.kode_jab);
						this.sg2.cells(3,row,line.nama);											
					}else{
						sender.cells(2,row,"");
						sender.cells(3,row,"");
					}
					this.sg2.validasi();
					
					sender.cells(1,row,nik);
					
				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"NIK "+sender.cells(0,row)+" tidak ditemukan","Inputkan nik lainnya.","checkKaryawan");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.cells(2,row,"");
					sender.cells(3,row,"");
				}				
			}
		}
		if (col == 5 || col == 2 ) {
			if (this.sg2.cells(5,row) != "" && this.sg2.cells(2,row) != "" ) {				
				
				if(this.sg2.cells(5,row) == "DN"){
					var strSQL = "select a.tarif_dn as tarif from pd_uhar a "+
					"where a.kode_jab = '"+this.sg2.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				}else{
					var strSQL = "select a.tarif_ln as tarif from pd_uhar a "+
					"where a.kode_jab = '"+this.sg2.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				}
				
				var data = this.dbLib.getDataProvider(strSQL,true);

				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];				
					var tarif = line.tarif * nilaiToFloat(this.sg2.cells(4,row));						
					this.sg2.cells(6,row,floatToNilai(tarif));										
				}
				this.sg2.validasi();				
							
			}
		}
		if (col == 7) {
			if (this.sg2.cells(7,row) != "") {				
				var lok = this.dataLok.get(sender.cells(7,row));				
				if (lok) sender.cells(8,row,lok);
				else {                                    
					if (trim(sender.cells(7,row)) != "") system.alert(this,"Lokasi "+sender.cells(7,row)+" tidak ditemukan","Inputkan lokasi lainnya.","checkKaryawan");                
					sender.cells(7,row,"");
					sender.cells(8,row,"");
				}				
			}
		}
		if (col == 9 || col == 7 ) {
			if (this.sg2.cells(9,row) != "" && this.sg2.cells(7,row) != "" ) {				
				
				if(this.sg2.cells(9,row) == "P"){
					var strSQL = "select a.tarif_p as tarif from pd_utrans a "+
					"where a.kode_trans = '"+this.sg2.cells(7,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				}else{
					var strSQL = "select a.tarif_pp as tarif from pd_utrans a "+
					"where a.kode_trans = '"+this.sg2.cells(7,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				}
				
				var data = this.dbLib.getDataProvider(strSQL,true);

				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];																
					this.sg2.cells(10,row,floatToNilai(line.tarif));										
				}
				this.sg2.validasi();				
							
			}
		}		
		sender.onChange.set(this,"doChangeCell2");		
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_sju16_rpt...";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_perdin='"+this.e_nb.getText()+"' ";
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
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataNIK = new portalui_arrayMap();							
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataNIK.set(line.nik, line.nama);										
								}								
							}	
							this.dataLok = new portalui_arrayMap();							
							if (result.result[1]){	    			        
								var line2;
								for (var i in result.result[1].rs.rows){
									line2 = result.result[1].rs.rows[i];									
									this.dataLok.set(line2.kode_trans, line2.nama);										
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
			this.sg2.clear(1);				
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){								
		try {			
			var strSQL = "select no_perdin, convert(varchar,tanggal,103) as tanggal, tujuan, agenda, convert(varchar,tgl_mulai,103) as tgl_mulai, convert(varchar,tgl_selesai,103) as tgl_selesai, transport from sju_perdin_m where kode_lokasi='"+this.app._lokasi+"'";	
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[1]);			
		} 
		catch(e) {
			alert(e);
		}
	},			
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];	
			this.sg1.appendData([line.no_perdin,line.tanggal,line.tujuan,line.agenda,line.tgl_mulai+" s.d "+line.tgl_selesai,line.transport]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[0]);												this.stsSimpan = 0;	
				this.e_nb.setText(this.sg1.cells(0,row));	
				var strSQL = "select a.no_perdin,a.tanggal,a.tujuan,a.agenda,a.tgl_mulai,a.tgl_selesai,a.transport,a.kode_akun,a.kode_pp,b.kode_kegiatan,a.nik_app1,a.nik_app2 "+
							 "from sju_perdin_m a  "+
							 "inner join sju_kegiatan b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_perdin='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.dp_d1.setDateString(line.tanggal);
						this.e_tujuan.setText(line.tujuan);
						this.e_agenda.setText(line.agenda);
						this.dp_d2.setDateString(line.tgl_mulai);
						this.dp_d3.setDateString(line.tgl_selesai);
						this.e_transport.setText(line.transport);
						// this.cb_akun.setText(line.kode_akun);
						this.cb_keg.setText(line.kode_kegiatan);
						this.cb_pp.setText(line.kode_pp);

						this.cb_app1.setText(line.nik_app1);
						this.cb_app2.setText(line.nik_app2);

						var strSQL = "select a.no_perdin,a.nik,b.nama,a.kode_jab,c.nama as posisi,a.jum_hari,a.negara,a.kode_trans,a.upd,a.p_pp,a.utrans,a.no_pb "+
									 "from sju_perdin_d a "+
									 "inner join karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
									 "inner join hr_jab c on a.kode_jab=c.kode_jab and a.kode_lokasi=c.kode_lokasi "+
									 "inner join pd_utrans d on a.kode_trans=d.kode_trans and a.kode_lokasi=d.kode_lokasi "+
									 "where a.no_perdin = '"+this.e_nb.getText()+"' ";					
						var data = this.dbLib.getDataProvider(strSQL,true);

						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg2.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								this.sg2.appendData([line.nik,line.nama,line.kode_jab,line.posisi,line.jum_hari,line.negara,floatToNilai(line.upd),line.kode_trans,line.nama_lok,line.p_pp,floatToNilai(line.utrans)]);
							}
						} else this.sg2.clear(1);
						this.stsSimpan = 0;	
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						this.stsSimpan = 1;	
						setTipeButton(tbSimpan);
					}
				}
			}
		} catch(e) {alert(e);}
	}
});