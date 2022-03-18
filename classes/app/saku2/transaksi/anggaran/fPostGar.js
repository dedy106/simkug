window.app_saku2_transaksi_anggaran_fPostGar = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_anggaran_fPostGar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_anggaran_fPostGar";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load & Posting Data Anggaran: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;portalui_uploader");
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,150,20],caption:"Tahun Anggaran",tag:2,maxLength:4,tipeText:ttAngka,change:[this,"doChange"]});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,100,18],visible:false}); 				
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.i_Load = new portalui_imageButton(this,{bound:[255,12,20,20],hint:"Load Data Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoad"]});				
		
		
		this.bUpload = new portalui_uploader(this,{bound:[840,12,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,450], childPage:["Ambil Data Anggaran","Load Jurnal Anggaran"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:18,tag:9,
				colTitle:["Kode Akun","DC","Nama","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des","Total","Kode CF","Kode Bidang"],				
				colWidth:[[17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[ 80,80, 100, 80,80,80,80,80,80,80,80,80,80,80,80 ,150,40,80]],
				colFormat:[[3,4,5,6,7,8,9,10,11,12,13,14,15],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				readOnly:true, defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll, grid:this.sg});
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.childPage[1].width-5,this.pc1.childPage[1].height-35],colCount:18,tag:0,				
				colTitle:["Kode Akun","DC","Nama","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des","Total","Kode CF","Kode Bidang"],
				colWidth:[[17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[ 80,80, 100, 80,80,80,80,80,80,80,80,80,80,80,80 ,150,40,80]],
				colFormat:[[3,4,5,6,7,8,9,10,11,12,13,14,15],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				readOnly:true, defaultRow:1
		});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.childPage[1].height-25,this.pc1.childPage[1].width-1,25],buttonStyle:2, grid:this.sg1, pager:[this,"selectPage"]});
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.sgn.uploader.setParam3("object");
			this.sg1.setAllowBlank(true);
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();					
			
			var tahun = parseFloat(this.dp_d1.year) + 1;
			this.e_tahun.setText(tahun);					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_anggaran_fPostGar.extend(window.childForm);
window.app_saku2_transaksi_anggaran_fPostGar.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 1000));
				this.sgn.rearrange();
				this.sgn.activePage = 0;	
			}else throw(data);					
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 1000;
		var finish = start + 1000;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];			
			this.sg1.appendData([line.kode_akun, line.dc, line.nama, floatToNilai(line.jan), floatToNilai(line.feb), floatToNilai(line.mar), 
								 floatToNilai(line.apr), floatToNilai(line.mei), floatToNilai(line.jun), floatToNilai(line.jul), floatToNilai(line.agu), 
								 floatToNilai(line.sep), floatToNilai(line.okt), floatToNilai(line.nov), floatToNilai(line.des),floatToNilai(line.total),line.kode_cf,line.kode_bidang]);
		}
		this.sg1.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[1]);
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_post_m','no_post',this.app._lokasi+"-POAG"+this.e_tahun.getText()+".",'000'));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from agg_post_m where modul = 'POST' and tahun = '"+this.e_tahun.getText()+"'");
					sql.add("delete from agg_gldt where modul = 'POST' and periode like '"+this.e_tahun.getText()+"%'");
					
					sql.add("insert into agg_post_m(no_post, kode_lokasi, modul, tgl_input, nik_user, tahun) values "+
							"('"+this.e_nb.getText()+"','00','POST',getdate(),'"+this.app._userLog+"','"+this.e_tahun.getText()+"')");

					var idx=0;
					for (var i=0;i< this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i)){
							idx++;
							for (var j=1;j< 13;j++){
								var k=j+2;
								if (this.sg1.cells(k,i) != "0") {
									this.periode = this.e_tahun.getText() + (j<10?"0":"")+j;
									var tgl = this.e_tahun.getText()+"-"+(j<10?"0":"")+j+"-01";
									var nilai = nilaiToFloat(this.sg1.cells(k,i));
									sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_cf) values "+
											"('"+this.e_nb.getText()+"',"+idx+",'00','POST','-','-','"+tgl+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(1,i)+"',"+nilai+",'"+this.sg1.cells(2,i)+"','"+this.sg1.cells(17,i)+"','"+this.periode+"','-','IDR',1,"+nilai+",getdate(),'"+this.app._userLog+"','-','-','-','-','-','-','"+this.sg1.cells(16,i)+"')");
								}
							
							}
						}
					}
					//SELISIH (ex : koma)
					sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
							"select '"+this.e_nb.getText()+"',9999,'00','POST','KOMA','-',substring(periode,1,4)+'-'+substring(periode,5,2)+'-01','5402000002',case when sum(case dc when 'D' then nilai else -nilai end)<0 then 'D' else 'C' end,abs(sum(case dc when 'D' then nilai else -nilai end)),'-','0',periode,'-','IDR',1,abs(sum(case dc when 'D' then nilai else -nilai end)),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
							"from agg_gldt where periode like '"+this.e_tahun.getText()+"%'  and modul='POST' group by periode");		
					
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
					this.sg.clear(1); this.sg1.clear(1);  
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
					this.simpan();
				break;							
		}	
	},		
	doLoad:function(sender){		
		if (this.e_tahun.getText() != "") {						
			var strSQL = "select a.kode_neraca,a.nama, case when substring(a.kode_neraca,1,1) = '3' then 'C' else 'D' end as dc,'0' as kode_bidang, "+
					"cast(round(isnull(b.jan,0),0) as decimal) as jan, "+
					"cast(round(isnull(c.feb,0),0) as decimal) as feb, "+
					"cast(round(isnull(d.mar,0),0) as decimal) as mar, "+
					"cast(round(isnull(e.apr,0),0) as decimal) as apr, "+
					"cast(round(isnull(f.mei,0),0) as decimal) as mei, "+
					"cast(round(isnull(g.jun,0),0) as decimal) as jun, "+
					"cast(round(isnull(h.jul,0),0) as decimal) as jul, "+
					"cast(round(isnull(i.agu,0),0) as decimal) as agu, "+
					"cast(round(isnull(j.sep,0),0) as decimal) as sep, "+
					"cast(round(isnull(k.okt,0),0) as decimal) as okt, "+
					"cast(round(isnull(l.nov,0),0) as decimal) as nov, "+
					"cast(round(isnull(m.des,0),0) as decimal) as des, "+
					"cast(round(isnull(b.jan,0)+isnull(c.feb,0)+isnull(d.mar,0)+isnull(e.apr,0)+isnull(f.mei,0)+isnull(g.jun,0)+isnull(h.jul,0)+isnull(i.agu,0)+isnull(j.sep,0)+isnull(k.okt,0)+isnull(l.nov,0)+isnull(m.des,0),0) as decimal) as total "+
					"from agg_neracagar a  "+
					"left join  "+
					"( "+
					"select x.kode_neraca,sum(y.nilai) as jan from relakungar x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
					"where y.tahun = '"+this.e_tahun.getText()+"' and y.bulan='01' and substring(y.kode_pp,3,1) <> '4' "+
					"group by x.kode_neraca "+
					") b on a.kode_neraca=b.kode_neraca "+
					"left join  "+
					"( "+
					"select x.kode_neraca,sum(y.nilai) as feb from relakungar x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
					"where y.tahun = '"+this.e_tahun.getText()+"' and y.bulan='02' and substring(y.kode_pp,3,1) <> '4' "+
					"group by x.kode_neraca "+
					") c on a.kode_neraca=c.kode_neraca "+
					"left join  "+
					"( "+
					"select x.kode_neraca,sum(y.nilai) as mar from relakungar x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
					"where y.tahun = '"+this.e_tahun.getText()+"' and y.bulan='03' and substring(y.kode_pp,3,1) <> '4' "+
					"group by x.kode_neraca "+
					") d on a.kode_neraca=d.kode_neraca "+
					"left join  "+
					"( "+
					"select x.kode_neraca,sum(y.nilai) as apr from relakungar x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
					"where y.tahun = '"+this.e_tahun.getText()+"' and y.bulan='04' and substring(y.kode_pp,3,1) <> '4' "+
					"group by x.kode_neraca "+
					") e on a.kode_neraca=e.kode_neraca "+
					"left join  "+
					"( "+
					"select x.kode_neraca,sum(y.nilai) as mei from relakungar x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
					"where y.tahun = '"+this.e_tahun.getText()+"' and y.bulan='05' and substring(y.kode_pp,3,1) <> '4' "+
					"group by x.kode_neraca "+
					") f on a.kode_neraca=f.kode_neraca "+
					"left join  "+
					"( "+
					"select x.kode_neraca,sum(y.nilai) as jun from relakungar x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
					"where y.tahun = '"+this.e_tahun.getText()+"' and y.bulan='06' and substring(y.kode_pp,3,1) <> '4' "+
					"group by x.kode_neraca "+
					") g on a.kode_neraca=g.kode_neraca "+
					"left join "+
					"( "+
					"select x.kode_neraca,sum(y.nilai) as jul from relakungar x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
					"where y.tahun = '"+this.e_tahun.getText()+"' and y.bulan='07' and substring(y.kode_pp,3,1) <> '4' "+
					"group by x.kode_neraca "+
					") h on a.kode_neraca=h.kode_neraca "+
					"left join "+
					"( "+
					"select x.kode_neraca,sum(y.nilai) as agu from relakungar x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
					"where y.tahun = '"+this.e_tahun.getText()+"' and y.bulan='08' and substring(y.kode_pp,3,1) <> '4' "+
					"group by x.kode_neraca "+
					") i on a.kode_neraca=i.kode_neraca "+
					"left join "+
					"( "+
					"select x.kode_neraca,sum(y.nilai) as sep from relakungar x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
					"where y.tahun = '"+this.e_tahun.getText()+"' and y.bulan='09' and substring(y.kode_pp,3,1) <> '4' "+
					"group by x.kode_neraca "+
					") j on a.kode_neraca=j.kode_neraca "+
					"left join  "+
					"( "+
					"select x.kode_neraca,sum(y.nilai) as okt from relakungar x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
					"where y.tahun = '"+this.e_tahun.getText()+"' and y.bulan='10' and substring(y.kode_pp,3,1) <> '4' "+
					"group by x.kode_neraca "+
					") k on a.kode_neraca=k.kode_neraca "+
					"left join  "+
					"( "+
					"select x.kode_neraca,sum(y.nilai) as nov from relakungar x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
					"where y.tahun = '"+this.e_tahun.getText()+"' and y.bulan='11' and substring(y.kode_pp,3,1) <> '4' "+
					"group by x.kode_neraca "+
					") l on a.kode_neraca=l.kode_neraca "+
					"left join "+
					"( "+
					"select x.kode_neraca,sum(y.nilai) as des from relakungar x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
					"where y.tahun = '"+this.e_tahun.getText()+"' and y.bulan='12' and substring(y.kode_pp,3,1) <> '4' "+
					"group by x.kode_neraca "+
					") m on a.kode_neraca=m.kode_neraca "+
					"where a.kode_lokasi= '00' and a.tipe ='posting' "+
					
					"union all "+
					
					"select a.kode_neraca,a.nama, case when substring(a.kode_neraca,1,1) = '3' then 'C' else 'D' end as dc,'4' as kode_bidang, "+
					"cast(round(isnull(b.jan,0),0) as decimal) as jan, "+
					"cast(round(isnull(c.feb,0),0) as decimal) as feb, "+
					"cast(round(isnull(d.mar,0),0) as decimal) as mar, "+
					"cast(round(isnull(e.apr,0),0) as decimal) as apr, "+
					"cast(round(isnull(f.mei,0),0) as decimal) as mei, "+
					"cast(round(isnull(g.jun,0),0) as decimal) as jun, "+
					"cast(round(isnull(h.jul,0),0) as decimal) as jul, "+
					"cast(round(isnull(i.agu,0),0) as decimal) as agu, "+
					"cast(round(isnull(j.sep,0),0) as decimal) as sep, "+
					"cast(round(isnull(k.okt,0),0) as decimal) as okt, "+
					"cast(round(isnull(l.nov,0),0) as decimal) as nov, "+
					"cast(round(isnull(m.des,0),0) as decimal) as des, "+
					"cast(round(isnull(b.jan,0)+isnull(c.feb,0)+isnull(d.mar,0)+isnull(e.apr,0)+isnull(f.mei,0)+isnull(g.jun,0)+isnull(h.jul,0)+isnull(i.agu,0)+isnull(j.sep,0)+isnull(k.okt,0)+isnull(l.nov,0)+isnull(m.des,0),0) as decimal) as total "+
					"from agg_neracagar a  "+
					"left join  "+
					"( "+
					"select x.kode_neraca,sum(y.nilai) as jan from relakungar x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
					"where y.tahun = '"+this.e_tahun.getText()+"' and y.bulan='01' and substring(y.kode_pp,3,1) = '4'  "+ 
					"group by x.kode_neraca "+
					") b on a.kode_neraca=b.kode_neraca "+
					"left join  "+
					"( "+
					"select x.kode_neraca,sum(y.nilai) as feb from relakungar x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
					"where y.tahun = '"+this.e_tahun.getText()+"' and y.bulan='02' and substring(y.kode_pp,3,1) = '4' "+
					"group by x.kode_neraca "+
					") c on a.kode_neraca=c.kode_neraca "+
					"left join  "+
					"( "+
					"select x.kode_neraca,sum(y.nilai) as mar from relakungar x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
					"where y.tahun = '"+this.e_tahun.getText()+"' and y.bulan='03' and substring(y.kode_pp,3,1) = '4' "+
					"group by x.kode_neraca "+
					") d on a.kode_neraca=d.kode_neraca "+
					"left join  "+
					"( "+
					"select x.kode_neraca,sum(y.nilai) as apr from relakungar x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
					"where y.tahun = '"+this.e_tahun.getText()+"' and y.bulan='04' and substring(y.kode_pp,3,1) = '4' "+
					"group by x.kode_neraca "+
					") e on a.kode_neraca=e.kode_neraca "+
					"left join  "+
					"( "+
					"select x.kode_neraca,sum(y.nilai) as mei from relakungar x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
					"where y.tahun = '"+this.e_tahun.getText()+"' and y.bulan='05' and substring(y.kode_pp,3,1) = '4' "+
					"group by x.kode_neraca "+
					") f on a.kode_neraca=f.kode_neraca "+
					"left join  "+
					"( "+
					"select x.kode_neraca,sum(y.nilai) as jun from relakungar x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
					"where y.tahun = '"+this.e_tahun.getText()+"' and y.bulan='06' and substring(y.kode_pp,3,1) = '4' "+
					"group by x.kode_neraca "+
					") g on a.kode_neraca=g.kode_neraca "+
					"left join "+
					"( "+
					"select x.kode_neraca,sum(y.nilai) as jul from relakungar x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
					"where y.tahun = '"+this.e_tahun.getText()+"' and y.bulan='07' and substring(y.kode_pp,3,1) = '4' "+
					"group by x.kode_neraca "+
					") h on a.kode_neraca=h.kode_neraca "+
					"left join "+
					"( "+
					"select x.kode_neraca,sum(y.nilai) as agu from relakungar x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
					"where y.tahun = '"+this.e_tahun.getText()+"' and y.bulan='08' and substring(y.kode_pp,3,1) = '4' "+
					"group by x.kode_neraca "+
					") i on a.kode_neraca=i.kode_neraca "+
					"left join "+
					"( "+
					"select x.kode_neraca,sum(y.nilai) as sep from relakungar x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
					"where y.tahun = '"+this.e_tahun.getText()+"' and y.bulan='09' and substring(y.kode_pp,3,1) = '4' "+
					"group by x.kode_neraca "+
					") j on a.kode_neraca=j.kode_neraca "+
					"left join  "+
					"( "+
					"select x.kode_neraca,sum(y.nilai) as okt from relakungar x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
					"where y.tahun = '"+this.e_tahun.getText()+"' and y.bulan='10' and substring(y.kode_pp,3,1) = '4' "+
					"group by x.kode_neraca "+
					") k on a.kode_neraca=k.kode_neraca "+
					"left join  "+
					"( "+
					"select x.kode_neraca,sum(y.nilai) as nov from relakungar x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
					"where y.tahun = '"+this.e_tahun.getText()+"' and y.bulan='11' and substring(y.kode_pp,3,1) = '4' "+
					"group by x.kode_neraca "+
					") l on a.kode_neraca=l.kode_neraca "+
					"left join "+
					"( "+
					"select x.kode_neraca,sum(y.nilai) as des from relakungar x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
					"where y.tahun = '"+this.e_tahun.getText()+"' and y.bulan='12' and substring(y.kode_pp,3,1) = '4' "+
					"group by x.kode_neraca "+
					") m on a.kode_neraca=m.kode_neraca "+
					"where a.kode_lokasi= '00' and a.tipe ='posting' "+					
					"order by a.kode_neraca";
				
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_neraca,line.dc.toUpperCase(),line.nama,floatToNilai(line.jan),floatToNilai(line.feb),floatToNilai(line.mar),floatToNilai(line.apr),floatToNilai(line.mei),floatToNilai(line.jun),floatToNilai(line.jul),floatToNilai(line.agu),floatToNilai(line.sep),floatToNilai(line.okt),floatToNilai(line.nov),floatToNilai(line.des),floatToNilai(line.total),'-',line.kode_bidang]);
				}
			} else this.sg.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_post_m','no_post',this.app._lokasi+"-POAG"+this.e_tahun.getText()+".",'000'));			
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
							this.clearLayar();						
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg1.clear(1);  
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});