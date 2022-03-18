/**
 * @author mr
 */
window.app_budget_transaksi_fPostOL = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fPostOL.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fPostOL";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Posting Data OutLook: Input", 0);
		try{	
			uses("portalui_datePicker;portalui_saiGrid;portalui_sgNavigator;portalui_saiCBB");			
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,23,180,20],caption:"Tahun Angg.",tag:2,maxLength:4,tipeText:ttAngka,change:[this,"doChange"]});
			this.bGen = new portalui_button(this, {bound: [256, 78, 80, 20],caption: "Gen",icon: "url(icon/" + system.getThemes() + "/process.png)"});
			this.ed_nb = new portalui_saiLabelEdit(this, {bound: [20, 78, 230, 20],caption: "No Bukti",readOnly:true});			
			this.eTahun2 = new portalui_saiLabelEdit(this,{bound:[20,12,180,20],tag:2,caption:"Tahun CutOff",readOnly:true});

			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.setTabChildIndex(); 

			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    this.standarLib = new util_standar();											
			this.bGen.onClick.set(this, "genClick");

			this.standarLib.clearByTag(this,["0","1"],undefined);				
			
			var data = this.dbLib.getDataProvider("select year(getdate()) +1 as tahun ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				line = data.rs.rows[0];							
				this.eTahun.setText(line.tahun);
			}
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_transaksi_fPostOL.extend(window.portalui_childForm);
window.app_budget_transaksi_fPostOL.implement({
	mainButtonClick : function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");		
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");		
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");		
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this, new Array("0","8","9"),undefined);				
				}
				break;
			case "simpan" :		
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abaupost_m','no_post',this.app._lokasi+"-OL"+this.eTahun.getText().substr(2,2)+".",'0000'));
				var sql = new server_util_arrayList();				
				var tgl = this.eTahun2.getText()+'-12-01';				
				
				sql.add("delete from agg_abaupost_m where keterangan = 'OL' and periode = '"+this.eTahun2.getText()+'12'+"'");
				sql.add("delete from agg_gldt where modul = 'OL' and periode = '"+this.eTahun2.getText()+'12'+"'");
				
				sql.add("insert into agg_abaupost_m(no_post, kode_lokasi, keterangan, tgl_input, nik_user, periode)"+
						"                values('"+this.ed_nb.getText()+"','"+this.app._lokKonsol+"','OL',now(), '"+this.app._userLog+"','"+this.eTahun2.getText()+'12'+"')");				

				
				//PDPT -------------
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+				
						"select '"+this.ed_nb.getText()+"',0,'"+this.app._lokKonsol+"','OL','PDPT','-','"+tgl+"',a.kode_akun,case when substring(a.kode_akun,1,1) = '3' then 'C' else 'D' end,round(case when x.outlook-y.saku <0  then 0 else x.outlook-y.saku end ,0),'SLS OUTLOOK','-','"+this.eTahun2.getText()+'12'+"','-','IDR',1,round(case when x.outlook-y.saku <0  then 0 else x.outlook-y.saku end ,0),getDate(),'"+this.app._userLog+"','-','-','-','-','-','-' "+						
						"from agg_reloutlook a "+
						"left outer join  "+
						"( "+
						"select a.kode_rekap,round(sum(c.outlook),0) as outlook  "+
						"from agg_reloutlook a "+
						"inner join agg_relakungar b on a.kode_rekap=b.kode_neraca "+
						"inner join agg_outlook c on b.kode_akun=c.kode_akun "+
						"where b.kode_lokasi='00' "+
						"group by a.kode_rekap "+
						") x on a.kode_rekap=x.kode_rekap "+
						"left outer join  "+
						"( "+
						"select a.kode_neraca,round(sum(c.nilai),0) as saku "+
						"from agg_reloutlook a  "+
						"inner join agg_relakun b on a.kode_neraca=b.kode_neraca "+
						"inner join agg_gldt c on b.kode_akun=c.kode_akun "+
						"where periode like '"+this.eTahun2.getText()+"%' "+
						"group by a.kode_neraca "+
						")y on a.kode_neraca=y.kode_neraca "+
						"where y.saku is not null and a.kode_rekap like '3%' "); 

				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_cf) "+
						 "select '"+this.ed_nb.getText()+"',1,'"+this.app._lokKonsol+"','OL','KBPDPT','-','"+tgl+"','1111021121','D',round(sum(case dc when 'C' then nilai else -nilai end) * 95/100,0),'-','-','"+this.eTahun2.getText()+'12'+"','-','IDR',1,round(sum(case dc when 'D' then nilai else -nilai end) * 95/100,0),now(),'"+this.app._userLog+"','-','-','-','-','-','-','9' "+
						 "from agg_gldt where periode like '"+this.eTahun2.getText()+"%' and modul = 'OL' and jenis = 'PDPT' ");
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						 "select '"+this.ed_nb.getText()+"',3,'"+this.app._lokKonsol+"','OL','ARPDPT1','-','"+tgl+"','1122305011','D',round(sum(case dc when 'C' then nilai else -nilai end) * 5/100,0),'-','-','"+this.eTahun2.getText()+'12'+"','-','IDR',1,round(sum(case dc when 'D' then nilai else -nilai end) * 5/100,0),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						 "from agg_gldt where periode like '"+this.eTahun2.getText()+"%' and modul = 'OL' and jenis = 'PDPT'");


				//BEBAN -------------
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+				
						"select '"+this.ed_nb.getText()+"',0,'"+this.app._lokKonsol+"','OL','BEBAN','-','"+tgl+"',a.kode_akun,case when substring(a.kode_akun,1,1) = '3' then 'C' else 'D' end,round(case when x.outlook-y.saku <0  then 0 else x.outlook-y.saku end ,0),'SLS OUTLOOK','-','"+this.eTahun2.getText()+'12'+"','-','IDR',1,round(case when x.outlook-y.saku <0  then 0 else x.outlook-y.saku end ,0),getDate(),'"+this.app._userLog+"','-','-','-','-','-','-' "+						
						"from agg_reloutlook a "+
						"left outer join  "+
						"( "+
						"select a.kode_rekap,round(sum(c.outlook),0) as outlook  "+
						"from agg_reloutlook a "+
						"inner join agg_relakungar b on a.kode_rekap=b.kode_neraca "+
						"inner join agg_outlook c on b.kode_akun=c.kode_akun "+
						"where b.kode_lokasi='00' "+
						"group by a.kode_rekap "+
						") x on a.kode_rekap=x.kode_rekap "+
						"left outer join  "+
						"( "+
						"select a.kode_neraca,round(sum(c.nilai),0) as saku "+
						"from agg_reloutlook a  "+
						"inner join agg_relakun b on a.kode_neraca=b.kode_neraca "+
						"inner join agg_gldt c on b.kode_akun=c.kode_akun "+
						"where periode like '"+this.eTahun2.getText()+"%' "+
						"group by a.kode_neraca "+
						")y on a.kode_neraca=y.kode_neraca "+
						"where y.saku is not null and a.kode_rekap in ('4112','4122','4152','4212') "); 

				//98.8% KAS BANK
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_cf) "+
						 "select '"+this.ed_nb.getText()+"',1,'"+this.app._lokKonsol+"','OL','KB','-','"+tgl+"','1111021121','C',round(sum(case dc when 'D' then nilai else -nilai end) * 98.8/100,0),'-','-','"+this.eTahun2.getText()+'12'+"','-','IDR',1,round(sum(case dc when 'D' then nilai else -nilai end) * 98.8/100,0),now(),'"+this.app._userLog+"','-','-','-','-','-','-','1' "+
						 "from agg_gldt where periode like '"+this.eTahun2.getText()+"%' and modul = 'OL' and jenis = 'BEBAN' ");
						 
				//0.5% UANG MUKA
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						 "select '"+this.ed_nb.getText()+"',2,'"+this.app._lokKonsol+"','OL','UM','-','"+tgl+"','1132010021','C',round(sum(case dc when 'D' then nilai else -nilai end) * 0.5/100,0),'-','-','"+this.eTahun2.getText()+'12'+"','-','IDR',1,round(sum(case dc when 'D' then nilai else -nilai end) * 0.5/100,0),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						 "from agg_gldt where periode like '"+this.eTahun2.getText()+"%' and modul = 'OL' and jenis = 'BEBAN'");

				//0.2% PAJAK MHS HRS DIBAYAR
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						 "select '"+this.ed_nb.getText()+"',3,'"+this.app._lokKonsol+"','OL','PJK','-','"+tgl+"','2162000000','C',round(sum(case dc when 'D' then nilai else -nilai end) * 0.2/100,0),'-','-','"+this.eTahun2.getText()+'12'+"','-','IDR',1,round(sum(case dc when 'D' then nilai else -nilai end) * 0.2/100,0),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						 "from agg_gldt where periode like '"+this.eTahun2.getText()+"%' and modul = 'OL' and jenis = 'BEBAN' ");
										 
				//0.5% BEBAN MHS HRS DIBAYAR
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						 "select '"+this.ed_nb.getText()+"',4,'"+this.app._lokKonsol+"','OL','BYMHD','-','"+tgl+"','2172000000','C',round(sum(case dc when 'D' then nilai else -nilai end) * 0.5/100,0),'-','-','"+this.eTahun2.getText()+'12'+"','-','IDR',1,round(sum(case dc when 'D' then nilai else -nilai end) * 0.5/100,0),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						 "from agg_gldt where periode like '"+this.eTahun2.getText()+"%' and modul = 'OL' and jenis = 'BEBAN' ");
						 						 
				//SUSUT-----------------------------
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						"select  distinct '"+this.ed_nb.getText()+"',5,'"+this.app._lokKonsol+"','OL','BP','-','"+tgl+"',a.kode_akun,'D',round(case when x.outlook-y.saku <0  then 0 else x.outlook-y.saku end,0),'SLS OUTLOOK AKTAP','-','"+this.eTahun2.getText()+'12'+"','-','IDR',1,round(case when x.outlook-y.saku <0  then 0 else x.outlook-y.saku end,0),getDate(),'"+this.app._userLog+"','-','-','-','-','-','-'    "+
						"from agg_reloutlook a "+
						"left outer join  "+
						"( "+
						"select a.kode_rekap,round(sum(c.outlook),0) as outlook  "+
						"from agg_reloutlook a  "+
						"inner join agg_relakungar b on a.kode_rekap=b.kode_neraca "+
						"inner join agg_outlook c on b.kode_akun=c.kode_akun "+
						"where b.kode_lokasi='00' and a.kode_rekap = '4132' "+
						"group by a.kode_rekap "+
						") x on a.kode_rekap=x.kode_rekap "+
						"left outer join  "+
						"( "+
						"select a.kode_rekap,round(sum(c.nilai),0) as saku "+
						"from agg_reloutlook a  "+
						"inner join agg_relakun b on a.kode_neraca=b.kode_neraca "+
						"inner join agg_gldt c on b.kode_akun=c.kode_akun "+
						"where periode like '2010%' and a.kode_rekap = '4132' "+
						"group by a.kode_rekap "+
						")y on a.kode_rekap=y.kode_rekap "+
						"where y.saku is not null and a.kode_rekap = '4132' ");
				
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						 "select '"+this.ed_nb.getText()+"',6,'"+this.app._lokKonsol+"','OL','AP','-','"+tgl+"','1422000000','C',round(sum(nilai),0),'-','-','"+this.eTahun2.getText()+'12'+"','-','IDR',1,round(sum(nilai),0),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						 "from agg_gldt where periode like '"+this.eTahun2.getText()+"%' and modul = 'OL' and jenis = 'BP' ");

				//AKTIVA TETAP -----------------------------
					sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						"select  distinct '"+this.ed_nb.getText()+"',0,'"+this.app._lokKonsol+"','OL','AKTAP','-','"+tgl+"',a.kode_akun,'D',round(case when x.outlook-y.saku <0  then 0 else x.outlook-y.saku end,0),'SLS OUTLOOK AKTAP','-','"+this.eTahun2.getText()+'12'+"','-','IDR',1,round(case when x.outlook-y.saku <0  then 0 else x.outlook-y.saku end,0),getDate(),'"+this.app._userLog+"','-','-','-','-','-','-'    "+
						"from agg_reloutlook a "+
						"left outer join  "+
						"( "+
						"select a.kode_rekap,round(sum(c.outlook),0) as outlook  "+
						"from agg_reloutlook a  "+
						"inner join agg_relakungar b on a.kode_rekap=b.kode_neraca "+
						"inner join agg_outlook c on b.kode_akun=c.kode_akun "+
						"where b.kode_lokasi='00' and a.kode_rekap = '1412' "+
						"group by a.kode_rekap "+
						") x on a.kode_rekap=x.kode_rekap "+
						"left outer join  "+
						"( "+
						"select a.kode_rekap,round(sum(c.nilai),0) as saku "+
						"from agg_reloutlook a  "+
						"inner join agg_relakun b on a.kode_neraca=b.kode_neraca "+
						"inner join agg_gldt c on b.kode_akun=c.kode_akun "+
						"where periode like '2010%' and a.kode_rekap = '1412' "+
						"group by a.kode_rekap "+
						")y on a.kode_rekap=y.kode_rekap "+
						"where y.saku is not null and a.kode_rekap = '1412' ");
				
				//95% KAS BANK
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_cf) "+
						 "select '"+this.ed_nb.getText()+"',0,'"+this.app._lokKonsol+"','OL','KBAKTAP','-','"+tgl+"','1111021121','C',round(sum(nilai) * 95/100,0),'-','-','"+this.eTahun2.getText()+'12'+"','-','IDR',1,round(sum(nilai) * 95/100,0),now(),'"+this.app._userLog+"','-','-','-','-','-','-','11' "+
						 "from agg_gldt where periode like '"+this.eTahun2.getText()+"%' and modul = 'OL' and jenis = 'AKTAP' ");

				//5% BEBAN MHS HRS DIBAYAR
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						 "select '"+this.ed_nb.getText()+"',0,'"+this.app._lokKonsol+"','OL','BYMHDAKTAP','-','"+tgl+"','2172000000','C',round(sum(nilai) * 5/100,0),'-','-','"+this.eTahun2.getText()+'12'+"','-','IDR',1,round(sum(nilai) * 5/100,0),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						 "from agg_gldt where periode like '"+this.eTahun2.getText()+"%' and modul = 'OL' and jenis = 'AKTAP' ");
				
						 
						 
				//BO ------------------------------
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						"select  distinct '"+this.ed_nb.getText()+"',0,'"+this.app._lokKonsol+"','OL','BO','-','"+tgl+"',a.kode_akun,'D',round(case when x.outlook-y.saku <0  then 0 else x.outlook-y.saku end,0),'SLS OUTLOOK CC','-','"+this.eTahun2.getText()+'12'+"','-','IDR',1,round(case when x.outlook-y.saku <0  then 0 else x.outlook-y.saku end,0),getDate(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						"from agg_reloutlook a "+
						"left outer join "+
						"( "+
						"select a.kode_neraca,round(sum(c.outlook),0) as outlook  "+
						"from agg_reloutlook a  "+
						"inner join agg_relakungar b on a.kode_rekap=b.kode_neraca "+
						"inner join agg_outlook c on b.kode_akun=c.kode_akun "+
						"where b.kode_lokasi='00' and a.kode_rekap in ('115101','115102','115103','115104') "+
						"group by a.kode_neraca "+
						") x on a.kode_neraca=x.kode_neraca "+
						"left outer join  "+
						"( "+
						"select a.kode_rekap,round(sum(case dc when 'D' then c.nilai else -c.nilai end),0) as saku "+
						"from agg_reloutlook a "+
						"inner join agg_relakun b on a.kode_neraca=b.kode_neraca "+
						"inner join agg_gldt c on b.kode_akun=c.kode_akun "+
						"where periode like '2010%' and a.kode_neraca in ('1107') "+
						"group by a.kode_rekap "+
						")y on a.kode_rekap=y.kode_rekap "+
						"where y.saku is not null and a.kode_neraca in ('1107') ");

				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_cf) "+
						 "select '"+this.ed_nb.getText()+"',0,'"+this.app._lokKonsol+"','OL','KBBO','-','"+tgl+"','1111021121','C',round(sum(nilai) * 90/100,0),'-','-','"+this.eTahun2.getText()+'12'+"','-','IDR',1,round(sum(nilai) * 90/100,0),now(),'"+this.app._userLog+"','-','-','-','-','-','-','13' "+
						 "from agg_gldt where periode like '"+this.eTahun2.getText()+"%' and modul = 'OL' and jenis = 'BO' ");
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						 "select '"+this.ed_nb.getText()+"',0,'"+this.app._lokKonsol+"','OL','HUTBO','-','"+tgl+"','2121010001','C',round(sum(nilai) * 10/100,0),'-','-','"+this.eTahun2.getText()+'12'+"','-','IDR',1,round(sum(nilai) * 10/100,0),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						 "from agg_gldt where periode like '"+this.eTahun2.getText()+"%' and modul = 'OL' and jenis = 'BO' ");

				
				//CC -----------------------------		 
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						"select  distinct '"+this.ed_nb.getText()+"',0,'"+this.app._lokKonsol+"','OL','CC','-','"+tgl+"',a.kode_akun,'D',round(case when x.outlook-y.saku <0  then 0 else x.outlook-y.saku end,0),'SLS OUTLOOK CC','-','"+this.eTahun2.getText()+'12'+"','-','IDR',1,round(case when x.outlook-y.saku <0  then 0 else x.outlook-y.saku end,0),getDate(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						"from agg_reloutlook a "+
						"left outer join "+
						"( "+
						"select a.kode_neraca,round(sum(c.outlook),0) as outlook  "+
						"from agg_reloutlook a  "+
						"inner join agg_relakungar b on a.kode_rekap=b.kode_neraca "+
						"inner join agg_outlook c on b.kode_akun=c.kode_akun "+
						"where b.kode_lokasi='00' and a.kode_rekap in ('530201','530202','530203','530204') "+
						"group by a.kode_neraca "+
						") x on a.kode_neraca=x.kode_neraca "+
						"left outer join  "+
						"( "+
						"select a.kode_rekap,round(sum(case dc when 'D' then c.nilai else -c.nilai end),0) as saku "+
						"from agg_reloutlook a "+
						"inner join agg_relakun b on a.kode_neraca=b.kode_neraca "+
						"inner join agg_gldt c on b.kode_akun=c.kode_akun "+
						"where periode like '2010%' and a.kode_neraca in ('412') "+
						"group by a.kode_rekap "+
						")y on a.kode_rekap=y.kode_rekap "+
						"where y.saku is not null and a.kode_neraca in ('412') ");

				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_cf) "+
						 "select '"+this.ed_nb.getText()+"',0,'"+this.app._lokKonsol+"','OL','KBCC','-','"+tgl+"','1111021121','C',round(sum(nilai) * 93/100,0),'-','-','"+this.eTahun2.getText()+'12'+"','-','IDR',1,round(sum(nilai) * 93/100,0),now(),'"+this.app._userLog+"','-','-','-','-','-','-','17' "+
						 "from agg_gldt where periode like '"+this.eTahun2.getText()+"%' and modul = 'OL' and jenis = 'CC' ");
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						 "select '"+this.ed_nb.getText()+"',0,'"+this.app._lokKonsol+"','OL','HUTCC','-','"+tgl+"','2122210001','C',round(sum(nilai) * 7/100,0),'-','-','"+this.eTahun2.getText()+'12'+"','-','IDR',1,round(sum(nilai) * 7/100,0),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						 "from agg_gldt where periode like '"+this.eTahun2.getText()+"%' and modul = 'OL' and jenis = 'CC' ");

					
				sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
						"select '"+this.ed_nb.getText()+"',0,'"+this.app._lokKonsol+"','OL','KOMA','-','"+tgl+"','5402000002',case when sum(case dc when 'D' then nilai else -nilai end)<0 then 'D' else 'C' end,abs(sum(case dc when 'D' then nilai else -nilai end)),'-','-','"+this.eTahun2.getText()+'12'+"','-','IDR',1,abs(sum(case dc when 'D' then nilai else -nilai end)),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
						"from agg_gldt where periode like '"+this.eTahun2.getText()+"%'  and modul ='OL'");
									
				this.dbLib.execArraySQL(sql);
				break;
			case "simpancek" : this.simpan();
				break;
		}
	},
	genClick: function(sender){
		try{
			if (this.ed_period != ""){
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abaupost_m','no_post',this.app._lokasi+"-OL"+this.eTahun.getText().substr(2,2)+".",'0000'));
			}
		}
		catch (e)
		{
			alert(e);
		}
	},
	doChange: function(sender) {
		if (this.eTahun.getText() != "") {
			this.eTahun2.setText(parseFloat(this.eTahun.getText()) - 1);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
					if (result.toLowerCase().search("error") == -1)					
					{						
						this.app._mainForm.pesan(2,"Transaksi sukses tersimpan dengan no bukti :("+ this.ed_nb.getText()+")");						
						this.app._mainForm.bClear.click();              						
					}else system.info(this,result,"");
	    			break;	      			
					case "listData" :
						this.sg1.clear(1); 
					break;
	    		}
			}
			catch(e)
			{
				alert(e);
			}
	    }
	}
});
